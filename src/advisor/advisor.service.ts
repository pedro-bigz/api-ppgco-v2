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
} from 'sequelize';
import { AppListing, OrderDto, Query } from 'src/core';
import { User, UserService } from 'src/user';
import { onlyNumbers, randomString } from 'src/utils';
import { ResearchLine } from 'src/research-line';
import { Role, ROLES } from 'src/roles';
import { Col } from 'sequelize/types/utils';
import { ADVISOR_REPOSITORY } from './advisor.constants';
import { Advisor } from './entities';
import { CreateAdvisorDto, UpdateAdvisorDto } from './dto';

interface CreateOptions extends SequelizeCreateOptions<Attributes<User>> {
  mailData?: string;
  files?: Record<string, Express.Multer.File[]>;
}

@Injectable()
export class AdvisorService {
  public constructor(
    @Inject(ADVISOR_REPOSITORY)
    private readonly advisorModel: typeof Advisor,
    private readonly userService: UserService,
    private readonly sequelize: Sequelize,
  ) {}

  public findAll(options?: FindOptions<Attributes<Advisor>>) {
    return this.advisorModel.findAll(options);
  }

  public async find(
    page: number,
    perPage: number,
    search: string,
    searchIn: string = 'id',
    order: OrderDto[],
  ) {
    return AppListing.create<typeof Advisor, Advisor>(this.advisorModel)
      ?.attachPagination(page, perPage)
      ?.attachMultipleOrder(
        order || [
          ['user.first_name', 'ASC'],
          ['user.last_name', 'ASC'],
        ],
      )
      ?.attachSearch(search, searchIn)
      ?.modifyQuery((query: Query<Advisor>) => {
        if (searchIn !== 'user.full_name' || !search) {
          return query;
        }

        const concatFn = (first: Col, last: Col) =>
          fn('CONCAT_WS', ' ', first, last);

        return {
          ...query,
          where: {
            [Op.and]: [
              where(concatFn(col('user.first_name'), col('user.last_name')), {
                [Op.like]: search,
              }),
            ],
          },
          include: [
            {
              model: User,
              attributes: Object.keys(User.getAttributes()),
              where: { deleted_at: null },
              include: [
                {
                  model: Role,
                  through: 'UserHasRole',
                  attributes: Object.keys(Role.getAttributes()),
                },
              ],
            },
            {
              model: ResearchLine,
              attributes: Object.keys(ResearchLine.getAttributes()),
              where: { deleted_at: null },
              required: false,
            },
          ],
        } as Query<Advisor>;
      })
      ?.get();
  }

  public findOne(id: number, options?: FindOptions<Attributes<Advisor>>) {
    return this.advisorModel.findOne({
      where: { id, ...(options?.where ?? {}) },
      ...options,
    });
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
        mailData: passwordMailMessage,
        transaction,
      });

      const advisor = await this.advisorModel.create({
        id: user.dataValues.id,
        lattes,
        research_line_id,
      });

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
    const advisorPromise = this.advisorModel.update(
      { lattes, research_line_id },
      { where: { id } },
    );
    const userPromise = this.userService.update(id, advisorUserData);

    return Promise.all([advisorPromise, userPromise]).then(
      ([[advisorUpdateds], [userUpdated]]) => [advisorUpdateds, userUpdated],
    );
  }

  public remove(id: number) {
    return this.advisorModel.destroy({ where: { id } });
  }
}
