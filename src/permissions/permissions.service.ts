import { Inject, Injectable } from '@nestjs/common';
import { PERMISSIONS_REPOSITORY } from './permissions.constants';
import { Permission } from './entities';
import { CreatePermissionsDto, UpdatePermissionsDto } from './dto';
import { AppListing, OrderDto, Query } from 'src/core';
import { User } from 'src/user';
import { RoleHasPermission } from 'src/role-has-permissions';
import { Op } from 'sequelize';
import { Role } from 'src/roles';
import { UserHasPermission } from 'src/user-has-permissions';

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
    order: OrderDto[],
  ) {
    return AppListing.create<typeof Permission, Permission>(
      this.permissionModel,
    )
      ?.attachPagination(page, perPage)
      ?.attachMultipleOrder(order || [['id', 'DESC']])
      ?.attachSearch(search, searchIn)
      ?.modifyQuery((query: Query<Permission>) => {
        return {
          ...query,
        };
      })
      ?.get();
  }

  public getUserPermissions(user: User) {
    return this.permissionModel.findAll({
      include: [
        {
          model: RoleHasPermission,
          // as: 'RoleHasPermission',
          attributes: ['permission_id', 'role_id'],
          separate: true,
          required: false,
          right: false,
          where: {
            role_id: {
              [Op.in]: user.roles.map((role: Role) => role.dataValues.id),
            },
          },
        },
        {
          model: UserHasPermission,
          // as: 'UserHasPermission',
          attributes: ['permission_id'],
          separate: true,
          required: false,
          right: false,
          where: { model_id: user.id },
        },
      ],
    });
  }

  public findOne(id: number) {
    return this.permissionModel.findOne({ where: { id } });
  }

  public findByName(name: string, guardName: string) {
    return this.permissionModel.findOne({
      where: { name, guard_name: guardName },
    });
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
