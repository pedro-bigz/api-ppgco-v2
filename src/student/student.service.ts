import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import dayjs from 'dayjs';
import _snakeCase from 'lodash/snakeCase';
import _difference from 'lodash/difference';
import { ROLES } from 'src/roles';
import { User, UserService } from 'src/user';
import { Project, ProjectService } from 'src/project';
import { Milestone, MilestoneService } from 'src/milestone';
import { onlyNumbers, randomString } from 'src/utils';
import { CommonListing, Filters, OrderDto } from 'src/common';
import { ProjectHasCoadvisorService } from 'src/project-has-coadvisor';
import { Student, VStudent } from './entities';
import {
  LATE_MILESTONE_ID,
  STUDENT_REPOSITORY,
  V_STUDENT_REPOSITORY,
} from './student.constants';
import { CreateStudentDto, UpdateStudentDto } from './dto';
import { Attributes, FindOptions, ProjectionAlias } from 'sequelize';

@Injectable()
export class StudentService {
  public constructor(
    @Inject(STUDENT_REPOSITORY) private readonly model: typeof Student,
    @Inject(V_STUDENT_REPOSITORY) private readonly view: typeof VStudent,
    private readonly userService: UserService,
    private readonly sequelize: Sequelize,
    private readonly coadvisorService: ProjectHasCoadvisorService,
    private readonly projectService: ProjectService,
    private readonly milestoneService: MilestoneService,
  ) {}

  public findAll(options?: FindOptions<Attributes<Student>>) {
    return this.model.findAll(options);
  }

  public findOne(id: number, options?: FindOptions<Attributes<Student>>) {
    return this.model.findOne({
      where: { id, ...(options?.where ?? {}) },
      ...options,
    });
  }

  public findOneFullData(id: number) {
    return this.model.scope('full').findOne({ where: { id } });
  }

  public findOneByScope(scope: string, id: number) {
    return this.model.scope(scope).findOne({ where: { id } });
  }

  public remove(id: number): Promise<number> | void {
    return this.model.destroy({ where: { id } });
  }

  public async find(
    page: number,
    perPage: number,
    search: string,
    searchIn: string,
    order: OrderDto[],
    filters?: Filters,
  ) {
    return CommonListing.create<VStudent, typeof VStudent>(this.view)
      ?.attachPagination(page, perPage)
      ?.attachMultipleOrder(order)
      ?.attachSearch(search, searchIn)
      ?.attachFilters(filters ?? {})
      ?.get();
  }

  public countStudentsGroupByCourse() {
    return this.view.findAll({
      attributes: [
        'course_id',
        'course_name',
        [Sequelize.fn('COUNT', Sequelize.col('*')), 'value'],
      ],
      group: ['course_id'],
    });
  }

  public countStudentsGroupByRes() {
    return this.view.findAll({
      attributes: [
        'research_line_id',
        'research_line_title',
        [Sequelize.fn('COUNT', Sequelize.col('*')), 'value'],
      ],
      group: ['research_line_id'],
    });
  }

  public count(
    search: string,
    searchIn: string,
    attributes: string | string[],
  ) {
    const options = { attributes: [] as string[] };

    if (searchIn) {
      options['where'] = { [searchIn]: search };
    }

    if (attributes) {
      options['attributes'] = Array.isArray(attributes)
        ? attributes
        : [attributes];
    }

    return this.view.findAll({
      ...options,
      attributes: [
        ...options['attributes'],
        [Sequelize.fn('COUNT', Sequelize.col('*')), 'value'],
      ],
    });
  }

  public groupedCount(
    search: string,
    searchIn: string,
    groupBy: string,
    attributes: string | string[],
  ) {
    const options = {
      attributes: [groupBy, [groupBy, 'key']] as (string | ProjectionAlias)[],
    };

    if (searchIn) {
      options['where'] = { [searchIn]: search };
    }

    if (attributes) {
      options['attributes'] = Array.isArray(attributes)
        ? [...options['attributes'], ...attributes]
        : [...options['attributes'], attributes];
    }

    options['group'] = [groupBy];

    return this.view.findAll({
      ...options,
      attributes: [
        ...options['attributes'],
        [Sequelize.fn('COUNT', Sequelize.col('*')), 'value'],
      ],
    });
  }

  public async getStudentsWithLateMilestones() {
    // return this.view.findAll({
    //   attributes: ['course_name', 'student_name'],
    //   include: [Milestone],
    // });
    const [counting] = await this.sequelize.query(
      `
        SELECT
          std.*,
          (
            SELECT count(1)
            FROM milestone AS ml
            WHERE ml.project_id = std.project_id
            AND ml.situation_id = :situation_id
          ) AS late_milestones_counting
        FROM v_student AS std
        HAVING late_milestones_counting > 0
      `,
      { replacements: { situation_id: LATE_MILESTONE_ID } },
    );

    return counting;
  }

  public async countStudentsWithLateMilestonesByCourse() {
    const [counting] = await this.sequelize.query(
      `
        SELECT
          std.course_id AS \`key\`,
          std.course_name,
          COUNT(distinct(std.id)) AS value
        FROM v_student AS std
        INNER JOIN milestone AS ml ON std.project_id = ml.project_id
        WHERE ml.situation_id = :situation_id
        GROUP BY \`key\`
      `,
      { replacements: { situation_id: LATE_MILESTONE_ID } },
    );

    return counting;
  }

  public findWithProjectData(id: number) {
    return this.model.scope('withProject').findOne({ where: { id } });
  }

  public findFromUser(user: User) {
    return this.model.scope('withProject').findOne({
      where: { user_id: user.dataValues.id },
    });
  }

  public async create(createStudentDto: CreateStudentDto) {
    const {
      first_name,
      last_name,
      email,
      birth_date,
      phone,
      title,
      course_id,
      start_date,
      end_date,
      advisor_id,
      research_line_id,
      coadvisors: coadvisorsList,
      ...studentDto
    } = createStudentDto;

    const password = randomString(8);
    const passwordMailMessage = `Sua senha é <b>${password}</b>. Altere sua senha no primeiro acesso.<br />`;

    const userData = {
      first_name,
      last_name,
      email,
      birth_date,
      password,
      phone: onlyNumbers(phone),
      roles: [ROLES.Student],
    };

    const { student, project } = await this.sequelize.transaction(async (t) => {
      const user = await this.userService.create(userData, {
        mailData: passwordMailMessage,
        transaction: t,
      });

      const student = await this.model.create(
        {
          ...studentDto,
          user_id: user.dataValues.id,
        },
        { transaction: t },
      );

      const project = await this.projectService.create(
        {
          title,
          course_id,
          start_date,
          end_date,
          advisor_id,
          research_line_id,
          student_id: student.dataValues.id,
        },
        { transaction: t },
      );

      const coadvisors = await this.coadvisorService.bulkCreate(
        coadvisorsList.map((advisor_id: number) => ({
          advisor_id,
          project_id: project.dataValues.id,
          student_id: student.dataValues.id,
          start_date: dayjs().format('YYYY-MM-DD'),
        })),
        { transaction: t },
      );

      return { user, student, project, coadvisors };
    });

    this.milestoneService.configProjectDefaultMilestones(
      +project.dataValues.id,
      +project.dataValues.course_id,
    );

    return student;
  }

  public async update(id: number, updateStudentDto: UpdateStudentDto) {
    const student = await this.findOneFullData(id);

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    const { id: project_id } = student.dataValues.project.dataValues;

    const {
      first_name,
      last_name,
      password,
      email,
      birth_date,
      phone,
      title,
      course_id,
      start_date,
      end_date,
      advisor_id,
      research_line_id,
      coadvisors: newCoadvisors,
      ...studentDto
    } = updateStudentDto;

    const [userAffecteds] = await this.userService.update(id, {
      first_name,
      last_name,
      email,
      password,
      birth_date,
      phone,
    });

    const [studentAffecteds] = await this.model.update(studentDto, {
      where: { id },
    });

    const [projectAffecteds] = await this.projectService.update(project_id, {
      title,
      course_id,
      start_date,
      end_date,
      advisor_id,
      research_line_id,
    });

    const oldCoadvisors = await this.coadvisorService
      .findFrom(project_id)
      .then((projectCoadvisors) => {
        return projectCoadvisors.map((projectCoadvisor) => {
          return projectCoadvisor.dataValues.advisor_id;
        });
      });

    const removedCoadvisors = _difference(oldCoadvisors, newCoadvisors);
    const addedCoadvisors = _difference(newCoadvisors, oldCoadvisors);

    await this.coadvisorService.removeMultipleAdvisorFrom(
      removedCoadvisors,
      project_id,
    );

    const coadvisors = await this.coadvisorService.bulkCreate(
      addedCoadvisors.map((advisor_id: number) => ({
        advisor_id,
        project_id,
        student_id: student.dataValues.id,
        start_date: dayjs().format('YYYY-MM-DD'),
      })),
    );

    return [
      [userAffecteds],
      [studentAffecteds],
      [projectAffecteds],
      [coadvisors.length],
    ];
  }
}
