import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { ENV, SequelizeConfig } from 'core';
import { AuthService, AuthController, AuthModule } from './auth';
import { User, UserModule } from './user';
import { CrudGeneratorModule, crudGeneratorCommands } from './crud-generator';
import { StudentModule, Student } from './student';
import { MilestoneModule, Milestone } from './milestone';
import {
  MilestoneDocumentModule,
  MilestoneDocument,
} from './milestone-document';
import { ProjectModule, Project } from './project';
import { AdvisorModule, Advisor } from './advisor';
import { ResearchLineModule, ResearchLine } from './research-line';
import {
  DisconnectedStudentModule,
  DisconnectedStudent,
} from './disconnected-student';
import { MilestoneHistoryModule, MilestoneHistory } from './milestone-history';
import { PublicationModule, Publication } from './publication';
import {
  PublicationProjectModule,
  PublicationProject,
} from './publication-project';
import {
  ProjectHasCoadvisorModule,
  ProjectHasCoadvisor,
} from './project-has-coadvisor';
import { StorageModule } from './storage/storage.module';
import { RolesModule, Role } from './roles';
import { UserHasRolesModule, UserHasRole } from './user-has-roles';
import {
  RoleHasPermissionsModule,
  RoleHasPermission,
} from './role-has-permissions';
import { PermissionsModule, Permission } from './permissions';
// {IMPORTS} Don't delete me, I'm used for automatic code generation

const env = ENV();
const orm = {
  tables: [
    User,
    Student,
    Milestone,
    MilestoneDocument,
    Project,
    Advisor,
    ResearchLine,
    DisconnectedStudent,
    MilestoneHistory,
    Publication,
    PublicationProject,
    ProjectHasCoadvisor,
    Role,
    UserHasRole,
    RoleHasPermission,
    Permission,
    // {MODELS} Don't delete me, I'm used for automatic code generation
  ],
  views: [],
};

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot(
      SequelizeConfig.configure({
        models: [...orm.tables, ...orm.views],
        // models: [__dirname + '/**/entities/*.entity.ts'],
      }),
    ),
    JwtModule.register({
      global: true,
      secret: env.JWT_SECRET_KEY,
    }),
    UserModule,
    AuthModule,
    CrudGeneratorModule,
    StudentModule,
    MilestoneModule,
    MilestoneDocumentModule,
    ProjectModule,
    AdvisorModule,
    ResearchLineModule,
    DisconnectedStudentModule,
    MilestoneHistoryModule,
    PublicationModule,
    PublicationProjectModule,
    ProjectHasCoadvisorModule,
    StorageModule,
    RolesModule,
    UserHasRolesModule,
    RoleHasPermissionsModule,
    PermissionsModule,
    // {MODULE} Don't delete me, I'm used for automatic code generation
  ],
  controllers: [AuthController],
  providers: [AuthService, ...crudGeneratorCommands],
  exports: [AuthService, ...crudGeneratorCommands],
})
export class AppModule {}
