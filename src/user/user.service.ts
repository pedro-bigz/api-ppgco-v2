import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import bcrypt from 'bcryptjs';
import _omit from 'lodash/omit';

import { AppListing, Query } from '@app/core';
import { USER_REPOSITORY } from './user.constants';
import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto';
import { Subject } from 'rxjs';
import { MailerService } from '@app/mailer/mailer.service';
import path from 'path';
import { emailVerificationTemplate } from './templates/email-verification';
import { generateToken } from '@app/utils';
import { ConfigService } from '@nestjs/config';
import { ActivationsService } from 'src/activations';
import { UserHasRolesService } from 'src/user-has-roles';
import { awaitAll, PromisePusherCallback } from 'src/utils/promises';
import { RolesService } from 'src/roles';

@Injectable()
export class UserService {
  public constructor(
    @Inject(USER_REPOSITORY)
    private readonly userModel: typeof User,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
    private readonly rolesService: RolesService,
    private readonly userHasRolesService: UserHasRolesService,
    private readonly activationsService: ActivationsService,
  ) {}

  public async create(
    { email, password, roles: roleNames, ...createUserDto }: CreateUserDto,
    files?: Record<string, Express.Multer.File[]>,
  ) {
    if (await this.findByEmail(email)) {
      throw new UnauthorizedException('This email has already been registered');
    }

    const user = await this.userModel.create({
      ...createUserDto,
      activated: 0,
      forbidden: 0,
      email,
      password: bcrypt.hashSync(password, 10),
    });

    const roles = await this.rolesService.findByNameList(roleNames);

    await awaitAll((add: PromisePusherCallback) => {
      add(this.userHasRolesService.addRoleToUser(user, roles));

      if (files) {
        add(user.saveFiles(files));
      }
    });

    this.sendEmailVerification(user);

    return user;
  }

  public async find(
    page: number,
    perPage: number,
    search: string,
    searchIn: string = 'id',
    order: Record<string, 'ASC' | 'DESC'>,
  ) {
    return AppListing.create<typeof User>(this.userModel)
      ?.attachPagination(page, perPage)
      ?.attachOrderObj(order || { id: 'DESC' })
      ?.attachSearch(search, searchIn)
      ?.modifyQuery((query: Query) => {
        return {
          ...query,
        };
      })
      ?.get<User>();
  }

  public async findOne(id: number): Promise<User | null> {
    return this.userModel.findOne({ where: { id } });
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

  public findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ where: { email } });
  }

  public async update(id: number, updateUserDto: UpdateUserDto) {
    return this.userModel.update(updateUserDto, { where: { id } });
  }

  public remove(id: number) {
    return this.userModel.destroy({ where: { id } });
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

  public sendEmailVerification(user: User) {
    const secret = this.configService.get('EMAIL_VERIFICATION_TOKEN_SECRET');
    const token = generateToken(secret!, user.email, Date.now());
    const link = this.configService.get('EMAIL_VERIFICATION_BASE_URL') + token;

    this.activationsService.createActivation({
      token,
      used: false,
      email: user.email,
    });

    this.mailerService.sendMail((template) => ({
      to: user.email,
      subject: 'Verificação de e-mail PPGCO-UFU',
      html: template(emailVerificationTemplate, { link, name: user.full_name }),
    }));
  }
}
