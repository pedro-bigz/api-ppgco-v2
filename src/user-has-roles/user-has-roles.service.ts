import { Inject, Injectable } from '@nestjs/common';
import { USER_HAS_ROLES_REPOSITORY } from './user-has-roles.constants';
import { UserHasRole } from './entities';
import { CreateUserHasRolesDto, UpdateUserHasRolesDto } from './dto';
import { AppListing, Query } from 'core';

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

  public update(role_id: number, updateUserHasRolesDto: UpdateUserHasRolesDto) {
    return this.userHasRoleModel.update(updateUserHasRolesDto, { where: { role_id } });
  }

  public remove(role_id: number) {
    return this.userHasRoleModel.destroy({ where: { role_id } });
  }
}
