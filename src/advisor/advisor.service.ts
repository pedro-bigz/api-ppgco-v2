import { Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import {
  col,
  fn,
  Op,
  where,
  Attributes,
  FindOptions,
  Transaction,
  CreateOptions as SequelizeCreateOptions,
  ProjectionAlias,
} from 'sequelize';
import {
  CommonListing,
  CommonService,
  Filters,
  OrderDto,
  Query,
} from 'src/common';
import { User, UserService } from 'src/user';
import { onlyNumbers, randomString } from 'src/utils';
import { ResearchLine } from 'src/research-line';
import { Role, ROLES } from 'src/roles';
import { Col } from 'sequelize/types/utils';
import { ADVISOR_REPOSITORY, V_ADVISOR_REPOSITORY } from './advisor.constants';
import { Advisor, VAdvisor } from './entities';
import { CreateAdvisorDto, UpdateAdvisorDto } from './dto';

interface CreateOptions extends SequelizeCreateOptions<Attributes<User>> {
  mailData?: string;
  files?: Record<string, Express.Multer.File[]>;
}

@Injectable()
export class AdvisorService {
  public constructor(
    @Inject(ADVISOR_REPOSITORY) private readonly model: typeof Advisor,
    @Inject(V_ADVISOR_REPOSITORY) private readonly view: typeof VAdvisor,
    private readonly userService: UserService,
    private readonly sequelize: Sequelize,
  ) {}

  public findAll(options?: FindOptions<Attributes<Advisor>>) {
    return this.model.findAll(options);
  }

  public findOne(id: number, options?: FindOptions<Attributes<Advisor>>) {
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

  public async find(
    page: number,
    perPage: number,
    search: string,
    searchIn: string = 'id',
    order: OrderDto[],
    filters: Filters,
  ) {
    return CommonListing.create<VAdvisor, typeof VAdvisor>(this.view)
      ?.attachPagination(page, perPage)
      ?.attachMultipleOrder(order || [['advisor_name', 'ASC']])
      ?.attachSearch(search, searchIn)
      ?.attachFilters(filters || {})
      ?.get();
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

  public async countStudentsByAdvisor() {
    const [counting] = await this.sequelize.query(
      `
        SELECT
          adv.id,
          adv.advisor_name,
          adv.research_line_title,
          (
            SELECT count(1)
            FROM v_student AS std
            WHERE std.advisor_id = adv.id
          ) AS students_counting
        FROM v_advisor AS adv
        HAVING students_counting > 0
      `,
    );

    return counting;
  }

  public async create(
    createAdvisorDto: CreateAdvisorDto,
    options?: CreateOptions,
  ) {
    const { lattes, research_line_id, phone, ...advisorUserData } =
      createAdvisorDto;

    const password = randomString(8);
    const passwordMailMessage = `Sua senha é <b>${password}</b>. Altere sua senha no primeiro acesso.<br />`;

    const userData = {
      password,
      roles: [ROLES.Advisor],
      phone: onlyNumbers(phone),
      ...advisorUserData,
    };

    const createAdvisor = async (transaction: Transaction) => {
      const user = await this.userService.create(userData, {
        transaction,
      });

      const advisor = await this.model.create(
        {
          id: user.dataValues.id,
          lattes,
          research_line_id,
        },
        { transaction },
      );

      this.userService.sendEmailVerification(user, passwordMailMessage);

      return advisor;
    };

    const advisor = options?.transaction
      ? await createAdvisor(options.transaction)
      : await this.sequelize.transaction(async (transaction) => {
          return createAdvisor(transaction);
        });

    return advisor;
  }

  public async update(id: number, updateAdvisorDto: UpdateAdvisorDto) {
    const { lattes, research_line_id, ...advisorUserData } = updateAdvisorDto;
    const advisorPromise = this.model.update(
      { lattes, research_line_id },
      { where: { id } },
    );
    const userPromise = this.userService.update(id, advisorUserData);

    return Promise.all([advisorPromise, userPromise]).then(
      ([[advisorUpdateds], [userUpdated]]) => [advisorUpdateds, userUpdated],
    );
  }

  public remove(id: number): Promise<number> | void {
    return this.model.destroy({ where: { id } });
  }
}
