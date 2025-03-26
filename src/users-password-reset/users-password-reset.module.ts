import { forwardRef, Module } from '@nestjs/common';
import { UsersPasswordResetService } from './users-password-reset.service';
import { usersPasswordResetProviders } from './users-password-reset.providers';
import { UsersPasswordResetController } from './users-password-reset.controller';
import { UserModule } from 'src/user';
import { AuthModule } from 'src/auth';

@Module({
  imports: [forwardRef(() => UserModule), forwardRef(() => AuthModule)],
  controllers: [UsersPasswordResetController],
  providers: [UsersPasswordResetService, ...usersPasswordResetProviders],
  exports: [UsersPasswordResetService],
})
export class UsersPasswordResetModule {}
