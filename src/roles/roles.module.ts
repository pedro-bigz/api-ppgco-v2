import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { rolesProviders } from './roles.providers';

@Module({
  providers: [RolesService, ...rolesProviders],
  exports: [RolesService],
})
export class RolesModule {}
