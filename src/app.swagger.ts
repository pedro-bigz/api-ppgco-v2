import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { patchNestJsSwagger } from 'nestjs-zod';
import { IS_PUBLIC_KEY } from './core';

type AppSwaggerDataType = {
  title: string;
  description: string;
  version: string;
};

export class AppSwagger {
  constructor(private data: AppSwaggerDataType) {
    patchNestJsSwagger();
  }

  static create(data: AppSwaggerDataType) {
    return new AppSwagger(data);
  }

  build() {
    return new DocumentBuilder()
      .setTitle(this.data.title)
      .setDescription(this.data.description)
      .setVersion(this.data.version)
      .addBearerAuth()
      .build();
  }

  createDocument(app: INestApplication<any>) {
    const document = SwaggerModule.createDocument(app, this.build());

    Object.values((document as OpenAPIObject).paths).forEach((path: any) => {
      Object.values(path).forEach((method: any) => {
        if (
          Array.isArray(method.security) &&
          method.security.includes(IS_PUBLIC_KEY)
        ) {
          method.security = undefined;
        }
      });
    });

    return document;
  }

  configure(app: INestApplication<any>) {
    SwaggerModule.setup('swagger', app, this.createDocument(app));
  }
}
