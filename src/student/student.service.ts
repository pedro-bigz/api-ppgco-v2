import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { AppListing, Query, OrderDto, dayjs } from 'src/core';
import { User, UserService } from 'src/user';
import { onlyNumbers, randomString } from 'src/utils';
import { ROLES } from 'src/roles';
import { STUDENT_REPOSITORY } from './student.constants';
import { Student } from './entities';
import { CreateStudentDto, UpdateStudentDto } from './dto';
import { MilestoneService } from 'src/milestone';
import { ProjectService } from 'src/project';
import _snakeCase from 'lodash/snakeCase';
import _difference from 'lodash/difference';
import { ProjectHasCoadvisorService } from 'src/project-has-coadvisor';
import { Attributes, FindOptions } from 'sequelize';

const formatCourseName = (name: string) => {
  return _snakeCase(name.normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
};

@Injectable()
export class StudentService {
  public constructor(
    @Inject(STUDENT_REPOSITORY)
    private readonly studentModel: typeof Student,
    private readonly userService: UserService,
    private readonly sequelize: Sequelize,
    private readonly coadvisorService: ProjectHasCoadvisorService,
    private readonly projectService: ProjectService,
    private readonly milestoneService: MilestoneService,
  ) {}

  public findAll(options?: FindOptions<Attributes<Student>>) {
    return this.studentModel.findAll(options);
  }

  public async find(
    page: number,
    perPage: number,
    search: string,
    searchIn: string = 'id',
    order: OrderDto[],
  ) {
    return AppListing.create<typeof Student, Student>(this.studentModel)
      ?.attachPagination(page, perPage)
      ?.attachMultipleOrder(order || [['id', 'DESC']])
      ?.attachSearch(search, searchIn)
      ?.modifyQuery((query: Query<Student>) => {
        return {
          ...query,
        };
      })
      ?.get();
  }

  public findOne(id: number, options?: FindOptions<Attributes<Student>>) {
    return this.studentModel.findOne({
      where: { id, ...options?.where },
      ...options,
    });
  }

  public findOneFullData(id: number) {
    return this.studentModel.scope('full').findOne({ where: { id } });
  }

  public findFromUser(user: User) {
    return this.studentModel.scope('full').findOne({
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

      console.log({ studentDto });

      const student = await this.studentModel.create(
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

    const [studentAffecteds] = await this.studentModel.update(studentDto, {
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

  public remove(id: number) {
    return this.studentModel.destroy({ where: { id } });
  }
}
