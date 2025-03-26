import { Inject, Injectable, NotImplementedException } from '@nestjs/common';
import { CommonService } from 'src/core';
import { User } from 'src/user';
import { RoleHasPermission } from 'src/role-has-permissions';
import { Op } from 'sequelize';
import { Role } from 'src/roles';
import { UserHasPermission } from 'src/user-has-permissions';
import { PERMISSIONS_REPOSITORY } from './permissions.constants';
import { Permission } from './entities';
import { CreatePermissionsDto, UpdatePermissionsDto } from './dto';

@Injectable()
export class PermissionsService extends CommonService<
  Permission,
  typeof Permission
> {
  public constructor(@Inject(PERMISSIONS_REPOSITORY) model: typeof Permission) {
    super(model);
  }

  public getUserPermissions(user: User) {
    return this.model.findAll({
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

  public findByName(name: string, guardName: string) {
    return this.model.findOne({
      where: { name, guard_name: guardName },
    });
  }

  public create(createPermissionsDto: CreatePermissionsDto) {
    return this.model.create({ ...createPermissionsDto });
  }

  public bulkCreate(bulkCreatePermissionsDto: CreatePermissionsDto[]) {
    return this.model.bulkCreate(
      bulkCreatePermissionsDto.map(
        (createPermissionsDto: CreatePermissionsDto) => ({
          ...createPermissionsDto,
        }),
      ),
      { returning: true },
    );
  }

  public update(id: number, updatePermissionsDto: UpdatePermissionsDto) {
    return this.model.update(updatePermissionsDto, { where: { id } });
  }

  public remove(_id: number) {
    throw new NotImplementedException();
  }
}
