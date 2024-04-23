import { Module } from '@nestjs/common';
import { UserHasRolesService } from './user-has-roles.service';
import { userHasRolesProviders } from './user-has-roles.providers';

@Module({
  providers: [UserHasRolesService, ...userHasRolesProviders],
  exports: [UserHasRolesService],
})
export class UserHasRolesModule {}
