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
  private document: OpenAPIObject;

  constructor(private data: AppSwaggerDataType) {}

  public static create(data: AppSwaggerDataType) {
    return new AppSwagger(data);
  }

  public build() {
    patchNestJsSwagger();
    return new DocumentBuilder()
      .setTitle(this.data.title)
      .setDescription(this.data.description)
      .setVersion(this.data.version)
      .addBearerAuth()
      .addSecurityRequirements('bearer')
      .build();
  }

  public createDocument(app: INestApplication<any>) {
    this.document = SwaggerModule.createDocument(app, this.build());
    return this;
  }

  public configurePublicRoutes() {
    Object.values(this.document.paths).forEach((path: any) => {
      Object.values(path).forEach((method: any) => {
        if (method.security?.includes?.(IS_PUBLIC_KEY)) {
          method.security = [];
        }
      });
    });

    return this;
  }

  public getDocument() {
    return this.document;
  }

  public configure(app: INestApplication<any>) {
    const document = this.createDocument(app)
      .configurePublicRoutes()
      .getDocument();

    SwaggerModule.setup('swagger', app, document);
  }
}