import { Type } from '@nestjs/common';
import { ApiResponseOptions } from '@nestjs/swagger';

export type ApiResponseType = Type<unknown> | Function | [Function] | string;

export type SwaggerSafeOptions = {
  path?: string | string[];
  options?: ApiResponseOptions;
  type?: ApiResponseType;
};
