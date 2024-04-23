import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { userProviders } from './user.providers';
import { MediaModule } from '@app/media';
import { MailerModule } from '@app/mailer/mailer.module';
import { ActivationsModule } from 'src/activations/activations.module';
import { UserHasRolesModule } from 'src/user-has-roles';
import { RolesModule } from 'src/roles';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    RolesModule,
    MediaModule,
    MailerModule,
    ActivationsModule,
    UserHasRolesModule,
  ],
  controllers: [UserController],
  providers: [UserService, ...userProviders],
  exports: [UserService],
})
export class UserModule {}
