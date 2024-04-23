import { Inject, Injectable } from '@nestjs/common';
import _capitalize from 'lodash/capitalize';
import { AppListing, Query } from '@app/core';
import { USER_HAS_ROLES_REPOSITORY } from './user-has-roles.constants';
import { UserHasRole } from './entities';
import { CreateUserHasRolesDto, UpdateUserHasRolesDto } from './dto';
import { User } from 'src/user/entities';
import { Role } from 'src/roles';
import { Attributes, BulkCreateOptions, Transaction } from 'sequelize';

@Injectable()
export class UserHasRolesService {
  public constructor(
    @Inject(USER_HAS_ROLES_REPOSITORY)
    private readonly userHasRoleModel: typeof UserHasRole,
  ) {}

  public findAll() {
    return this.userHasRoleModel.findAll();
  }

  public async find(
    page: number,
    perPage: number,
    search: string,
    searchIn: string = 'role_id',
    order: Record<string, 'ASC' | 'DESC'>,
  ) {
    return AppListing.create<typeof UserHasRole>(this.userHasRoleModel)
      ?.attachPagination(page, perPage)
      ?.attachOrderObj(order || { role_id: 'DESC' })
      ?.attachSearch(search, searchIn)
      ?.modifyQuery((query: Query) => {
        return {
          ...query,
        };
      })
      ?.get<UserHasRole>();
  }

  public findOne(role_id: number) {
    return this.userHasRoleModel.findOne({ where: { role_id } });
  }

  public create(createUserHasRolesDto: CreateUserHasRolesDto) {
    return this.userHasRoleModel.create({ ...createUserHasRolesDto });
  }

  public bulkCreate(
    createMultipleUserHasRolesDto: CreateUserHasRolesDto[],
    options?: BulkCreateOptions<Attributes<UserHasRole>>,
  ) {
    return this.userHasRoleModel.bulkCreate(
      createMultipleUserHasRolesDto.map((item) => ({ ...item })),
      options,
    );
  }

  public async addRoleToUser(
    user: User,
    roles: Role[],
    transaction?: Transaction | null,
  ) {
    return this.bulkCreate(
      roles.map((role) => ({
        role_id: role.id,
        user_id: user.id,
      })),
      { transaction },
    );
  }

  public update(role_id: number, updateUserHasRolesDto: UpdateUserHasRolesDto) {
    return this.userHasRoleModel.update(updateUserHasRolesDto, {
      where: { role_id },
    });
  }

  public remove(role_id: number) {
    return this.userHasRoleModel.destroy({ where: { role_id } });
  }
}
