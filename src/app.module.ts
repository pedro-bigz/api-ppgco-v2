import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { AuthService, AuthController, AuthModule } from './auth';
import { UserModule } from './user';
import { CrudGeneratorModule, crudGeneratorCommands } from './crud-generator';
import { StudentModule } from './student';
import { MilestoneModule } from './milestone';
import { MilestoneDocumentModule } from './milestone-document';
import { ProjectModule } from './project';
import { AdvisorModule } from './advisor';
import { ResearchLineModule } from './research-line';
import { DisconnectedStudentModule } from './disconnected-student';
import { MilestoneHistoryModule } from './milestone-history';
import { PublicationModule } from './publication';
import { ProjectHasCoadvisorModule } from './project-has-coadvisor';
import { RolesModule } from './roles';
import { UserHasRolesModule } from './user-has-roles';
import { RoleHasPermissionsModule } from './role-has-permissions';
import { PermissionsModule } from './permissions';
import { MediaModule } from './media';
import { MailerModule } from './mailer';
import { ActivationsModule } from './activations';
import { EmailVerificationModule } from './email-verification';
import { CoursesModule } from './courses';
import { SubjectsModule } from './subjects';
import { SystemApliancesModule } from './system-apliances';
import { UserHasPermissionsModule } from './user-has-permissions';
import { DocumentsModule } from './documents';
import { MilestoneSituationModule } from './milestone-situation';
import { DefaultMilestonesModule } from './default-milestones/default-milestones.module';
import { NotificationsModule } from './notifications';
import { PublicationCoauthorsModule } from './publication-coauthors';
import { UsersPasswordResetModule } from './users-password-reset';
import { CoversModule } from './covers/covers.module';
import { Dialect } from 'sequelize';
import { DB } from './app.constants';
import { isProduction } from './utils';
import { entities } from './app.entities';
// {IMPORTS} Don't delete me, I'm used for automatic code generation

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: configService.get<Dialect>(DB.CONNECTION),
        host: configService.get<string>(DB.HOST),
        port: configService.get<number>(DB.PORT),
        username: configService.get<string>(DB.USERNAME),
        password: configService.get<string>(DB.PASSWORD),
        database: configService.get<string>(DB.DATABASE),
        autoLoadModels: true,
        synchronize: false,
        ssl: isProduction(),
        models: [...entities.tables, ...entities.views],
      }),
      inject: [ConfigService],
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
    }),
    UserModule,
    AuthModule,
    ProjectModule,
    CrudGeneratorModule,
    PublicationModule,
    StudentModule,
    MilestoneModule,
    MilestoneDocumentModule,
    AdvisorModule,
    ResearchLineModule,
    DisconnectedStudentModule,
    MilestoneHistoryModule,
    ProjectHasCoadvisorModule,
    RolesModule,
    UserHasRolesModule,
    RoleHasPermissionsModule,
    PermissionsModule,
    MediaModule,
    MailerModule,
    ActivationsModule,
    EmailVerificationModule,
    CoursesModule,
    SubjectsModule,
    SystemApliancesModule,
    UserHasPermissionsModule,
    DocumentsModule,
    MilestoneSituationModule,
    DefaultMilestonesModule,
    NotificationsModule,
    PublicationCoauthorsModule,
    UsersPasswordResetModule,
    CoversModule,
    // {MODULE} Don't delete me, I'm used for automatic code generation
  ],
  controllers: [AuthController],
  providers: [AuthService, Logger, ...crudGeneratorCommands],
  exports: [AuthService, ...crudGeneratorCommands],
})
export class AppModule {}
