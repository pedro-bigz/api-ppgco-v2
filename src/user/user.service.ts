import { UsersPasswordResetService } from 'src/users-password-reset';
import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import {
  Attributes,
  CreateOptions as SequelizeCreateOptions,
  Transaction,
} from 'sequelize';

import bcrypt from 'bcryptjs';
import _map from 'lodash/map';
import _omit from 'lodash/omit';

import { CommonService, Filters, OrderDto } from 'src/core';
import { MailerService } from 'src/mailer';
import { generateToken } from 'src/utils';
import { Role, RolesService } from 'src/roles';
import { ActivationsService } from 'src/activations';
import { UserHasRolesService } from 'src/user-has-roles';
import { USER_REPOSITORY } from './user.constants';
import { CreateUserDto, UpdateUserDto } from './dto';
import { awaitAll, PromisePusherCallback } from 'src/utils';
import { User } from './entities/user.entity';
import { forgotPasswordTemplate, emailVerificationTemplate } from './templates';

interface CreateOptions extends SequelizeCreateOptions<Attributes<User>> {
  mailData?: string;
  files?: Record<string, Express.Multer.File[]>;
}

const PASSWORD_PADDING = 10;

@Injectable()
export class UserService extends CommonService<User, typeof User> {
  public constructor(
    @Inject(USER_REPOSITORY) model: typeof User,
    private readonly sequelize: Sequelize,
    private readonly rolesService: RolesService,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
    private readonly userHasRolesService: UserHasRolesService,
    private readonly activationsService: ActivationsService,
    private readonly usersPasswordResetService: UsersPasswordResetService,
  ) {
    super(model);
  }

  public async create(dto: CreateUserDto, options?: CreateOptions) {
    const { email, password, roles: roleNames, ...createUserDto } = dto;
    const { files, mailData, ...sequelizeOptions } = options ?? {};

    if (await this.findByEmail(email)) {
      throw new UnauthorizedException('This email has already been registered');
    }

    const createUser = async (transaction: Transaction) => {
      const user = await this.model.create(
        {
          ...createUserDto,
          activated: 0,
          forbidden: 0,
          email,
          password: bcrypt.hashSync(password, PASSWORD_PADDING),
        },
        { ...sequelizeOptions, transaction },
      );

      const roles = await this.rolesService.findByNameList(roleNames);

      await awaitAll((add: PromisePusherCallback) => {
        add(this.userHasRolesService.addRoleToUser(user, roles, transaction));

        if (files) {
          add(user.saveFiles(files));
        }
      });

      return user;
    };

    const user = options?.transaction
      ? await createUser(options.transaction)
      : await this.sequelize.transaction(async (transaction) => {
          return createUser(transaction);
        });

    if (mailData) {
      this.sendEmailVerification(user, mailData ?? '');
    }

    return user;
  }

  public async find(
    page: number,
    perPage: number,
    search: string,
    searchIn: string = 'id',
    order: OrderDto[],
    filters?: Filters,
  ) {
    const columns = Object.keys(_omit(this.model.getAttributes(), 'password'));
    return this.attachPaginatedListing(
      page,
      perPage,
      search,
      searchIn,
      order,
      filters,
    )?.get(columns);
  }

  public omitPassword(user: User) {
    return _omit(user, 'password');
  }

  public async findOne(id: number): Promise<User | null> {
    return this.model.findOne({ where: { id } });
  }

  public async findOneScoped(scope: string, id: number): Promise<User | null> {
    return this.model.scope(scope).findOne({ where: { id } });
  }

  public async findOneWithRoles(id: number): Promise<User | null> {
    return this.findOneScoped('withRoles', id);
  }

  public async findOneWithoutSensiteData(id: number): Promise<User | null> {
    return this.findOneScoped('findOneWithoutSensiteData', id);
  }

  public omitSensitiveData(user: User) {
    return _omit(
      user?.dataValues,
      'password',
      'remember_token',
      'email_verified_at',
      'activated',
      'forbidden',
    );
  }

  public async exists(id: number): Promise<boolean> {
    return this.model
      .count({ where: { id } })
      .then<boolean>((response) => response > 0);
  }

  public async existsBy(
    label: string,
    value: string | number | boolean,
  ): Promise<boolean> {
    return this.model
      .count({ where: { [label]: value } })
      .then<boolean>((response) => response > 0);
  }

  public findByEmail(email: string): Promise<User | null> {
    return this.model.scope('full').findOne({ where: { email } });
  }

  public async update(id: number, updateUserDto: UpdateUserDto) {
    return this.model.update(updateUserDto, { where: { id } });
  }

  public async updatePassword(id: number, password: string) {
    const dto = {
      password: bcrypt.hashSync(password, PASSWORD_PADDING),
    };
    return this.model.update(dto, { where: { id } });
  }

  public async setLastLogin(user: User | number) {
    if (typeof user === 'object') {
      user.last_login_at = new Date();
      return user.save();
    }

    return this.model.update(
      { last_login_at: new Date() },
      { where: { id: user } },
    );
  }

  public remove(id: number) {
    return this.model.destroy({ where: { id } });
  }

  public async setEmailAsVerified(email: string) {
    const user = await this.findByEmail(email);

    if (!user) {
      throw new NotFoundException(
        'This email does not correspond to any registered user',
      );
    }

    return this.update(user.id, {
      email_verified_at: new Date(),
      activated: true,
    });
  }

  public sendEmailVerification(user: User, additionalData: string) {
    const secret = this.configService.get('EMAIL_VERIFICATION_TOKEN_SECRET');
    const token = generateToken(secret!, user.email, Date.now());
    const link = this.configService.get('EMAIL_VERIFICATION_BASE_URL') + token;

    return Promise.all([
      this.activationsService.createActivation({
        token,
        used: false,
        email: user.email,
      }),
      this.mailerService.sendMail((template) => ({
        to: user.email,
        subject: 'Verificação de e-mail PPGCO-UFU',
        html: template(emailVerificationTemplate, {
          link,
          additionalData,
          name: user.full_name,
        }),
      })),
    ]);
  }

  public sendForgotPasswordEmail(user: User) {
    const secret = this.configService.get('FORGOT_PASSWORD_TOKEN_SECRET');
    const token = generateToken(secret!, user.email, Date.now());
    const link =
      this.configService.get('FORGOT_PASSWORD_TOKEN_BASE_URL') + token;

    return Promise.all([
      this.usersPasswordResetService.create({
        token,
        is_expired: false,
        is_validated: false,
        email: user.email,
      }),
      this.mailerService.sendMail((template) => ({
        // to: user.email,
        to: 'pedropaulo.spaiva.a@gmail.com',
        subject: 'Resetar senha PPGCO-UFU',
        html: template(forgotPasswordTemplate, {
          link,
          name: user.full_name,
        }),
      })),
    ]);
  }
}
