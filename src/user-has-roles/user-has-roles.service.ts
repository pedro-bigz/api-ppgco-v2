import { Inject, Injectable } from '@nestjs/common';
import _capitalize from 'lodash/capitalize';
import { CommonListing, CommonService, OrderDto, Query } from 'src/common';
import { USER_HAS_ROLES_REPOSITORY } from './user-has-roles.constants';
import { UserHasRole } from './entities';
import { CreateUserHasRolesDto, UpdateUserHasRolesDto } from './dto';
import { User } from 'src/user/entities';
import { Role } from 'src/roles';
import { Attributes, BulkCreateOptions, Transaction } from 'sequelize';

@Injectable()
export class UserHasRolesService extends CommonService<
  UserHasRole,
  typeof UserHasRole
> {
  public constructor(
    @Inject(USER_HAS_ROLES_REPOSITORY) model: typeof UserHasRole,
  ) {
    super(model);
  }

  public async find(
    page: number,
    perPage: number,
    search: string,
    searchIn: string = 'role_id',
    order: OrderDto[],
  ) {
    return CommonListing.create<UserHasRole, typeof UserHasRole>(this.model)
      ?.attachPagination(page, perPage)
      ?.attachMultipleOrder(order || [['role_id', 'DESC']])
      ?.attachSearch(search, searchIn)
      ?.modifyQuery((query: Query<UserHasRole>) => {
        return {
          ...query,
        };
      })
      ?.get();
  }

  public findOne(role_id: number) {
    return this.model.findOne({ where: { role_id } });
  }

  public create(createUserHasRolesDto: CreateUserHasRolesDto) {
    return this.model.create({ ...createUserHasRolesDto });
  }

  public bulkCreate(
    createMultipleUserHasRolesDto: CreateUserHasRolesDto[],
    options?: BulkCreateOptions<Attributes<UserHasRole>>,
  ) {
    return this.model.bulkCreate(
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
    return this.model.update(updateUserHasRolesDto, {
      where: { role_id },
    });
  }

  public remove(role_id: number) {
    return this.model.destroy({ where: { role_id } });
  }
}
