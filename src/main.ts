import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppSwagger } from './app.swagger';
import { configHelper } from 'src/core';
import { PermissionGuard, PermissionsService } from './permissions';
import { ConfigService } from '@nestjs/config';
import { RolesService } from './roles';
import { RoleHasPermissionsService } from './role-has-permissions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(
    new PermissionGuard(
      app.get(Reflector),
      app.get(ConfigService),
      app.get(PermissionsService),
      app.get(RoleHasPermissionsService),
    ),
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
