import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { rolesProviders } from './roles.providers';
import { RolesController } from './roles.controller';

@Module({
  controllers: [RolesController],
  providers: [RolesService, ...rolesProviders],
  exports: [RolesService],
})
export class RolesModule {}
