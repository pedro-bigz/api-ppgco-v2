import { Patch as NestPatch, applyDecorators } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import _capitalize from 'lodash/capitalize';
import { SwaggerSafeOptions } from '../types/swagger-safe.types';
import { getResponseType } from '../utils';
import { UpdateSuccessResponse } from 'src/common/dto';

export const SwaggerSafePatch = (props?: SwaggerSafeOptions) => {
  const options = {
    ...props?.options,
    type: getResponseType(props?.options, props?.type ?? UpdateSuccessResponse),
  };

  return applyDecorators(ApiOkResponse(options), NestPatch(props?.path));
};
