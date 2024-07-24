import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { permissionsProviders } from './permissions.providers';
import { RoleHasPermissionsModule } from 'src/role-has-permissions';

@Module({
  imports: [RoleHasPermissionsModule],
  providers: [PermissionsService, ...permissionsProviders],
  exports: [PermissionsService],
})
export class PermissionsModule {}
