import { Injectable, Logger } from '@nestjs/common';
import { BaseGenerator } from './base.generator';
import { paths } from '../crud-generator.constants';
import { dtoPaginatedModelTemplate } from '../file-templates';
import {
  DatabaseHelper,
  FileHelper,
  TemplateHelper,
  ShellHelper,
  ZodHelper,
} from '../helpers';

@Injectable()
export class DtoPaginatedModelGenerator extends BaseGenerator {
  protected dtoName: string;
  protected schemaName: string;

  public constructor(
    protected readonly databaseHelper: DatabaseHelper,
    protected readonly fileHelper: FileHelper,
    protected readonly shellHelper: ShellHelper,
    protected readonly templateHelper: TemplateHelper,
    protected readonly zodHelper: ZodHelper,
  ) {
    super(databaseHelper, fileHelper, shellHelper, templateHelper, zodHelper);
    this.templatePath = paths.templates.dtoPaginated;
  }

  public async generate(tableName: string, isForced: boolean) {
    if (this.hasLog) Logger.debug('[GENERATING] Dto Paginated ...');

    await this.configureModule(tableName);

    this.filename = this.pathHelper.resolveDtosPath('paginated');

    return this.setIsForced(isForced).generateFile(dtoPaginatedModelTemplate, {
      modelClassName: this.nameHelper.resolveModelClassName(),
    });
  }
}
