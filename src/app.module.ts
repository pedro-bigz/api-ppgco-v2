import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeConfig } from 'src/config';
import { AuthService, AuthController, AuthModule } from './auth';
import { User, UserModule } from './user';
import { CrudGeneratorModule, crudGeneratorCommands } from './crud-generator';
import { StudentModule, Student, VStudent } from './student';
import { MilestoneModule, Milestone, VMilestone } from './milestone';
import {
  MilestoneDocumentModule,
  MilestoneDocument,
} from './milestone-document';
import { ProjectModule, Project } from './project';
import { AdvisorModule, Advisor, VAdvisor } from './advisor';
import { ResearchLineModule, ResearchLine } from './research-line';
import {
  DisconnectedStudentModule,
  DisconnectedStudent,
} from './disconnected-student';
import { MilestoneHistoryModule, MilestoneHistory } from './milestone-history';
import { PublicationModule, Publication, VPublication } from './publication';
import {
  ProjectHasCoadvisorModule,
  ProjectHasCoadvisor,
} from './project-has-coadvisor';
import { RolesModule, Role } from './roles';
import { UserHasRolesModule, UserHasRole } from './user-has-roles';
import {
  RoleHasPermissionsModule,
  RoleHasPermission,
} from './role-has-permissions';
import { PermissionsModule, Permission } from './permissions';
import { MediaModule, Media } from './media';
import { MailerModule } from './mailer';
import { Activation, ActivationsModule } from './activations';
import { EmailVerificationModule } from './email-verification';
import { CoursesModule, Course } from './courses';
import { SubjectsModule, Subject, VSubject } from './subjects';
import { SystemApliancesModule, SystemApliance } from './system-apliances';
import {
  UserHasPermissionsModule,
  UserHasPermission,
} from './user-has-permissions';
import { DocumentsModule, Document } from './documents';
import {
  MilestoneSituationModule,
  MilestoneSituation,
} from './milestone-situation';
import { DefaultMilestonesModule } from './default-milestones/default-milestones.module';
import {
  NotificationsModule,
  Notification,
  NotificationUsers,
} from './notifications';
import {
  PublicationCoauthorsModule,
  PublicationCoauthor,
} from './publication-coauthors';
// {IMPORTS} Don't delete me, I'm used for automatic code generation

const orm = {
  tables: [
    User,
    Milestone,
    MilestoneDocument,
    Project,
    Publication,
    Student,
    Advisor,
    ResearchLine,
    DisconnectedStudent,
    MilestoneHistory,
    ProjectHasCoadvisor,
    Role,
    UserHasRole,
    UserHasPermission,
    RoleHasPermission,
    Permission,
    Media,
    Activation,
    Course,
    Subject,
    SystemApliance,
    Document,
    MilestoneSituation,
    Notification,
    NotificationUsers,
    PublicationCoauthor,
    // {MODELS} Don't delete me, I'm used for automatic code generation
  ],
  views: [VMilestone, VSubject, VPublication, VStudent, VAdvisor],
};

console.log({ orm });

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot(
      SequelizeConfig.configure({
        models: [...orm.tables, ...orm.views],
      }),
    ),
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
    // {MODULE} Don't delete me, I'm used for automatic code generation
  ],
  controllers: [AuthController],
  providers: [AuthService, Logger, ...crudGeneratorCommands],
  exports: [AuthService, ...crudGeneratorCommands],
})
export class AppModule {}
