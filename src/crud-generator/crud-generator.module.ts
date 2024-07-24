import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CrudGeneratorService } from './crud-generator.service';
import { crudGeneratorCommands } from './crud-generator.providers';
import {
  ZodHelper,
  FileHelper,
  DatabaseHelper,
  TemplateHelper,
  ShellHelper,
} from './helpers';
import {
  ConstantsGenerator,
  ControllerSpecGenerator,
  ControllerGenerator,
  ServiceSpecGenerator,
  ServiceGenerator,
  ProvidersGenerator,
  ModelGenerator,
  ModelIndexGenerator,
  ModuleGenerator,
  ModuleIndexGenerator,
  DtoCreateGenerator,
  DtoUpdateGenerator,
  DtoIndexGenerator,
  ModuleImportGenerator,
  ModelFolderGenerator,
  DtoFolderGenerator,
} from './generators';
import { PermissionsModule } from 'src/permissions';
import { RoleHasPermissionsModule } from 'src/role-has-permissions';
import { DtoPaginatedModelGenerator } from './generators/dto-paginated-model.generator';

@Module({
  imports: [
    SequelizeModule.forFeature(),
    PermissionsModule,
    RoleHasPermissionsModule,
  ],
  exports: [
    CrudGeneratorService,
    ZodHelper,
    FileHelper,
    DatabaseHelper,
    TemplateHelper,
    ShellHelper,
    ConstantsGenerator,
    ControllerSpecGenerator,
    ControllerGenerator,
    ServiceSpecGenerator,
    ServiceGenerator,
    ProvidersGenerator,
    ModelGenerator,
    ModelFolderGenerator,
    ModelIndexGenerator,
    ModuleGenerator,
    ModuleIndexGenerator,
    DtoFolderGenerator,
    DtoIndexGenerator,
    DtoCreateGenerator,
    DtoUpdateGenerator,
    DtoPaginatedModelGenerator,
    ModuleImportGenerator,
    ...crudGeneratorCommands,
  ],
  providers: [
    CrudGeneratorService,
    ZodHelper,
    FileHelper,
    DatabaseHelper,
    TemplateHelper,
    ShellHelper,
    ConstantsGenerator,
    ControllerSpecGenerator,
    ControllerGenerator,
    ServiceSpecGenerator,
    ServiceGenerator,
    ProvidersGenerator,
    ModelGenerator,
    ModelFolderGenerator,
    ModelIndexGenerator,
    ModuleGenerator,
    ModuleIndexGenerator,
    DtoFolderGenerator,
    DtoCreateGenerator,
    DtoUpdateGenerator,
    DtoIndexGenerator,
    ModuleImportGenerator,
    DtoPaginatedModelGenerator,
    ...crudGeneratorCommands,
  ],
})
export class CrudGeneratorModule {}
