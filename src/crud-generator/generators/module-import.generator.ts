import { Injectable, Logger } from '@nestjs/common';
import { BaseGenerator } from './base.generator';
import { paths } from '../crud-generator.constants';
import {
  DatabaseHelper,
  FileHelper,
  TemplateHelper,
  ShellHelper,
  ZodHelper,
} from '../helpers';
import { makeTabs } from 'src/utils';
import { generationMarks } from './generator.constants';

@Injectable()
export class ModuleImportGenerator extends BaseGenerator {
  private modulePath: string;
  private modelClassName: string;
  private moduleClassName: string;

  public constructor(
    protected readonly databaseHelper: DatabaseHelper,
    protected readonly fileHelper: FileHelper,
    protected readonly shellHelper: ShellHelper,
    protected readonly templateHelper: TemplateHelper,
    protected readonly zodHelper: ZodHelper,
  ) {
    super(databaseHelper, fileHelper, shellHelper, templateHelper, zodHelper);
    this.templatePath = paths.templates.model;
  }

  public async generate(tableName: string, isForced: boolean) {
    if (this.hasLog) Logger.debug('[GENERATING] Module Import ...');

    await this.configureModule(tableName);

    this.filename = this.pathHelper.resolveModelsPath();
    this.modulePath = this.pathHelper.getModuleName();
    this.modelClassName = this.nameHelper.resolveModelClassName();
    this.moduleClassName = this.nameHelper.resolveModuleClassName();

    return this.setIsForced(isForced)
      .updateAppModuleFile()
      .updateAppEntityFile();
  }

  protected import({ imports, from }: Record<'imports' | 'from', string>) {
    return `import { ${imports} } from 'src/${from}';`;
  }

  protected updateAppModuleFile() {
    const toReplace = {
      moduleIimports: this.import({
        imports: this.moduleClassName,
        from: this.modulePath,
      }),
      module: this.moduleClassName + ',',
    };
    this.fileHelper.replaceContent(paths.app.module, [
      {
        find: generationMarks.moduleIimports,
        toReplace:
          toReplace.moduleIimports + '\n' + generationMarks.moduleIimports,
      },
      {
        find: generationMarks.module,
        toReplace:
          toReplace.module + '\n' + makeTabs(2) + generationMarks.module,
      },
    ]);
    return this;
  }

  protected updateAppEntityFile() {
    const toReplace = {
      modelImports: this.import({
        imports: this.moduleClassName,
        from: `${this.modulePath}/entities`,
      }),
      model: this.modelClassName + ',',
    };
    this.fileHelper.replaceContent(paths.app.modelList, [
      {
        find: generationMarks.modelImports,
        toReplace: toReplace.modelImports + '\n' + generationMarks.modelImports,
      },
      {
        find: generationMarks.model,
        toReplace: toReplace.model + '\n' + makeTabs(2) + generationMarks.model,
      },
    ]);
    return this;
  }
}
