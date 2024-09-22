import { Get as NestGet, applyDecorators } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import _capitalize from 'lodash/capitalize';
import { SwaggerSafeOptions } from '../types/swagger-safe.types';
import { getResponseType, prepareTypeOptions } from '../utils';

export interface SwaggerSafeGetOptions extends SwaggerSafeOptions {
  isPaginated?: boolean;
}

export const SwaggerSafeGet = (props?: SwaggerSafeGetOptions) => {
  const { isPaginated = false } = props ?? {};
  const options = {
    ...props?.options,
    ...prepareTypeOptions(getResponseType(props?.options, props?.type)),
  };

  return applyDecorators(
    ApiOkResponse({
      ...options,
      description: `This endpoint gets records in the database`,
    }),
    NestGet(props?.path),
  );
};
