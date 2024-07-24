import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PERMISSION_KEY } from './permissions.decorator';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/roles';
import { PermissionsService } from './permissions.service';
import { RoleHasPermissionsService } from 'src/role-has-permissions';

@Injectable()
export class PermissionGuard implements CanActivate {
  public constructor(
    protected readonly reflector: Reflector,
    protected readonly configService: ConfigService,
    protected readonly permissionsService: PermissionsService,
    protected readonly roleHasPermissionsService: RoleHasPermissionsService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const [permissionName, guardName] = this.reflector.getAllAndMerge<string[]>(
      PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!permissionName) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    if (!request.user || !request.user.roles) {
      return true;
    }

    const permission = await this.permissionsService.findByName(
      permissionName,
      guardName,
    );

    if (!permission) {
      throw new Error('Permission not found');
    }

    return this.roleHasPermissionsService.hasPermissions(
      request.user.roles.map((role: Role) => role.id),
      permission.dataValues.id,
    );
  }
}
