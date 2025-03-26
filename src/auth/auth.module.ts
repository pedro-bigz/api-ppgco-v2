import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { authProviders } from './auth.providers';
import { PermissionsModule } from 'src/permissions';

@Module({
  imports: [UserModule, PermissionsModule],
  controllers: [AuthController],
  providers: [AuthService, ...authProviders],
  exports: [AuthService],
})
export class AuthModule {}
