import { Inject, Injectable } from '@nestjs/common';
import { USER_HAS_PERMISSIONS_REPOSITORY } from './user-has-permissions.constants';
import { UserHasPermission } from './entities';
import {
  CreateUserHasPermissionsDto,
  UpdateUserHasPermissionsDto,
} from './dto';
import { AppListing, OrderDto, Query } from 'src/core';

@Injectable()
export class UserHasPermissionsService {
  public constructor(
    @Inject(USER_HAS_PERMISSIONS_REPOSITORY)
    private readonly userHasPermissionModel: typeof UserHasPermission,
  ) {}

  public findAll() {
    return this.userHasPermissionModel.findAll();
  }

  public async find(
    page: number,
    perPage: number,
    search: string,
    searchIn: string = 'model_id',
    order: OrderDto[],
  ) {
    return AppListing.create<typeof UserHasPermission, UserHasPermission>(
      this.userHasPermissionModel,
    )
      ?.attachPagination(page, perPage)
      ?.attachMultipleOrder(order || [['model_id', 'DESC']])
      ?.attachSearch(search, searchIn)
      ?.modifyQuery((query: Query<UserHasPermission>) => {
        return {
          ...query,
        };
      })
      ?.get();
  }

  public findOne(model_id: number) {
    return this.userHasPermissionModel.findOne({ where: { model_id } });
  }

  public create(createUserHasPermissionsDto: CreateUserHasPermissionsDto) {
    return this.userHasPermissionModel.create({
      ...createUserHasPermissionsDto,
    });
  }

  public update(
    model_id: number,
    updateUserHasPermissionsDto: UpdateUserHasPermissionsDto,
  ) {
    return this.userHasPermissionModel.update(updateUserHasPermissionsDto, {
      where: { model_id },
    });
  }

  public remove(model_id: number) {
    return this.userHasPermissionModel.destroy({ where: { model_id } });
  }
}
