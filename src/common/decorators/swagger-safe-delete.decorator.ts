import { Delete as NestDelete, applyDecorators } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import _capitalize from 'lodash/capitalize';
import { getResponseType } from '../utils';
import { SwaggerSafeOptions } from '../types/swagger-safe.types';
import { DeleteSuccessResponse } from 'src/common/dto';

export const SwaggerSafeDelete = (props?: SwaggerSafeOptions) => {
  const options = {
    ...props?.options,
    type: getResponseType(props?.options, props?.type ?? DeleteSuccessResponse),
  };

  return applyDecorators(
    ApiOkResponse({
      description: `This endpoint deletes records in the database`,
      ...options,
    }),
    NestDelete(props?.path),
  );
};
