import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AllExceptionsFilter, configHelper } from 'src/core';
import { PermissionGuard, PermissionsService } from 'src/permissions';
import { RoleHasPermissionsService } from 'src/role-has-permissions';
import { AppModule } from 'src/app.module';
import { AppSwagger } from 'src/app.swagger';
import { AppConfig } from 'src/app.configure';
import { AppLogger } from 'src/app.logger';

async function bootstrap() {
  AppConfig.configure();

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: AppLogger.create(configHelper.isProduction()).config(),
  });

  app.useGlobalGuards(
    new PermissionGuard(
      app.get(Reflector),
      app.get(ConfigService),
      app.get(PermissionsService),
      app.get(RoleHasPermissionsService),
    ),
  );

  app.useBodyParser('json', { limit: '25mb' });
  app.useBodyParser('urlencoded', { limit: '25mb' });

  app.useGlobalFilters(
    new AllExceptionsFilter(app.get(HttpAdapterHost), app.get(Logger)),
  );

  if (!configHelper.isProduction()) {
    const swaggerData = {
      title: process.env.APP_NAME as string,
      description: process.env.APP_DESCRIPTION as string,
      version: process.env.APP_VERSION as string,
    };

    AppSwagger.create(swaggerData).configure(app);
  }

  app.enableCors();

  await app.listen(configHelper.getPort('4000'));
}
bootstrap();
