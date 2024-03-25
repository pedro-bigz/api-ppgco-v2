import { Module } from '@nestjs/common';
import { UserHasRolesService } from './user-has-roles.service';
import { UserHasRolesController } from './user-has-roles.controller';
import { userHasRolesProviders } from './user-has-roles.providers';

@Module({
  controllers: [UserHasRolesController],
  providers: [UserHasRolesService, ...userHasRolesProviders],
})
export class UserHasRolesModule {}
