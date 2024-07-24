import { Module } from '@nestjs/common';
import { UserHasPermissionsService } from './user-has-permissions.service';
import { UserHasPermissionsController } from './user-has-permissions.controller';
import { userHasPermissionsProviders } from './user-has-permissions.providers';

@Module({
  controllers: [UserHasPermissionsController],
  providers: [UserHasPermissionsService, ...userHasPermissionsProviders],
})
export class UserHasPermissionsModule {}
