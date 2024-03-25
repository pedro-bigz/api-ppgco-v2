import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PERMISSION_KEY } from './permissions.decorator';
import { AuthGuard } from '@app/auth';
import { UserService } from '@app/user';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@app/roles';
import { Permission } from './entities';

@Injectable()
export class PermissionGuard implements CanActivate {
  public constructor(
    protected readonly reflector: Reflector,
    protected readonly configService: ConfigService,
  ) {}

  static create() {
    return new PermissionGuard(new Reflector(), new ConfigService());
  }

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

    const storedPermissions = request.user.roles.reduce(
      (accum: Permission[], role: Role) => [
        ...accum,
        ...role.dataValues.permissions,
      ],
      [],
    );

    return storedPermissions.some((permission: Permission) => {
      return (
        permission.dataValues.name === permissionName &&
        permission.dataValues.guard_name === guardName
      );
    });
  }
}
