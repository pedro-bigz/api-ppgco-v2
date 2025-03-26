import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { userProviders } from './user.providers';
import { MediaModule } from 'src/media';
import { MailerModule } from 'src/mailer/mailer.module';
import { ActivationsModule } from 'src/activations/activations.module';
import { UserHasRolesModule } from 'src/user-has-roles';
import { RolesModule } from 'src/roles';
import { UsersPasswordResetModule } from 'src/users-password-reset';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    RolesModule,
    MediaModule,
    MailerModule,
    ActivationsModule,
    UserHasRolesModule,
    UsersPasswordResetModule
  ],
  controllers: [UserController],
  providers: [UserService, ...userProviders],
  exports: [UserService],
})
export class UserModule {}
