import { Inject, Injectable } from '@nestjs/common';
import { PERMISSIONS_REPOSITORY } from './permissions.constants';
import { Permission } from './entities';
import { CreatePermissionsDto, UpdatePermissionsDto } from './dto';
import { AppListing, Query } from '@app/core';

@Injectable()
export class PermissionsService {
  public constructor(
    @Inject(PERMISSIONS_REPOSITORY)
    private readonly permissionModel: typeof Permission,
  ) {}

  public findAll() {
    return this.permissionModel.findAll();
  }

  public async find(
    page: number,
    perPage: number,
    search: string,
    searchIn: string = 'id',
    order: Record<string, 'ASC' | 'DESC'>,
  ) {
    return AppListing.create<typeof Permission>(this.permissionModel)
      ?.attachPagination(page, perPage)
      ?.attachOrderObj(order || { id: 'DESC' })
      ?.attachSearch(search, searchIn)
      ?.modifyQuery((query: Query) => {
        return {
          ...query,
        };
      })
      ?.get<Permission>();
  }

  public findOne(id: number) {
    return this.permissionModel.findOne({ where: { id } });
  }

  public create(createPermissionsDto: CreatePermissionsDto) {
    return this.permissionModel.create({ ...createPermissionsDto });
  }

  public bulkCreate(bulkCreatePermissionsDto: CreatePermissionsDto[]) {
    return this.permissionModel.bulkCreate(
      bulkCreatePermissionsDto.map(
        (createPermissionsDto: CreatePermissionsDto) => ({
          ...createPermissionsDto,
        }),
      ),
      { returning: true },
    );
  }

  public update(id: number, updatePermissionsDto: UpdatePermissionsDto) {
    return this.permissionModel.update(updatePermissionsDto, { where: { id } });
  }

  // public remove(id: number) {
  //   return this.permissionModel.destroy({ where: { id } });
  // }
}
