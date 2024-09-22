import { Inject, Injectable } from '@nestjs/common';
import { USER_HAS_PERMISSIONS_REPOSITORY } from './user-has-permissions.constants';
import { UserHasPermission } from './entities';
import {
  CreateUserHasPermissionsDto,
  UpdateUserHasPermissionsDto,
} from './dto';
import { CommonListing, CommonService, OrderDto, Query } from 'src/common';

@Injectable()
export class UserHasPermissionsService extends CommonService<
  UserHasPermission,
  typeof UserHasPermission
> {
  public constructor(
    @Inject(USER_HAS_PERMISSIONS_REPOSITORY) model: typeof UserHasPermission,
  ) {
    super(model);
  }

  public async find(
    page: number,
    perPage: number,
    search: string,
    searchIn: string = 'model_id',
    order: OrderDto[],
  ) {
    return this.getCommonListing()
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
    return this.model.findOne({ where: { model_id } });
  }

  public create(createUserHasPermissionsDto: CreateUserHasPermissionsDto) {
    return this.model.create({
      ...createUserHasPermissionsDto,
    });
  }

  public update(
    model_id: number,
    updateUserHasPermissionsDto: UpdateUserHasPermissionsDto,
  ) {
    return this.model.update(updateUserHasPermissionsDto, {
      where: { model_id },
    });
  }

  public remove(model_id: number) {
    return this.model.destroy({ where: { model_id } });
  }
}
