import { Get as NestGet, applyDecorators } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import _capitalize from 'lodash/capitalize';
import { SwaggerSafeOptions } from './types';
import { getResponseType, prepareTypeOptions } from './utils';

export interface SwaggerSafeGetOptions extends SwaggerSafeOptions {
  isPaginated?: boolean;
}

export const SwaggerSafeGet = (props?: SwaggerSafeGetOptions) => {
  const options = {
    ...props?.options,
    ...prepareTypeOptions(getResponseType(props?.options, props?.type)),
  };

  return applyDecorators(
    ApiOkResponse({
      description: `This endpoint gets records in the database`,
      ...options,
    }),
    NestGet(props?.path),
  );
};
