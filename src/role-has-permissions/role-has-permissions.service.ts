import { Inject, Injectable } from '@nestjs/common';
import { ROLE_HAS_PERMISSIONS_REPOSITORY } from './role-has-permissions.constants';
import { RoleHasPermission } from './entities';
import {
  CreateRoleHasPermissionsDto,
  UpdateRoleHasPermissionsDto,
} from './dto';
import { Op } from 'sequelize';

@Injectable()
export class RoleHasPermissionsService {
  public constructor(
    @Inject(ROLE_HAS_PERMISSIONS_REPOSITORY)
    private readonly roleHasPermissionModel: typeof RoleHasPermission,
  ) {}

  public create(createRoleHasPermissionsDto: CreateRoleHasPermissionsDto) {
    return this.roleHasPermissionModel.create({
      ...createRoleHasPermissionsDto,
    });
  }

  public bulkCreate(roleId: number, permissionIds: number[]) {
    return this.roleHasPermissionModel.bulkCreate(
      permissionIds.map((permissionId) => ({
        role_id: roleId,
        permission_id: permissionId,
      })),
    );
  }

  public update(
    permission_id: number,
    role_id: number,
    updateRoleHasPermissionsDto: UpdateRoleHasPermissionsDto,
  ) {
    return this.roleHasPermissionModel.update(updateRoleHasPermissionsDto, {
      where: { permission_id, role_id },
    });
  }

  public remove(permission_id: number, role_id: number) {
    return this.roleHasPermissionModel.destroy({
      where: { permission_id, role_id },
    });
  }

  public async hasPermissions(roleIds: number[], permissionId: number) {
    return this.roleHasPermissionModel
      .count({
        where: {
          permission_id: permissionId,
          role_id: { [Op.in]: roleIds },
        },
      })
      .then((response) => response > 0);
  }
}
