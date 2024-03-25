import { Module } from '@nestjs/common';
import { RoleHasPermissionsService } from './role-has-permissions.service';
import { roleHasPermissionsProviders } from './role-has-permissions.providers';

@Module({
  providers: [RoleHasPermissionsService, ...roleHasPermissionsProviders],
  exports: [RoleHasPermissionsService],
})
export class RoleHasPermissionsModule {}
