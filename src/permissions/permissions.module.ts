import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { permissionsProviders } from './permissions.providers';
import { AuthModule } from '@app/auth';

@Module({
  providers: [PermissionsService, ...permissionsProviders],
  exports: [PermissionsService],
})
export class PermissionsModule {}
