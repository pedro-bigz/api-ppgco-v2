import { Post as NestPost, applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import _capitalize from 'lodash/capitalize';
import { SwaggerSafeOptions } from './types';
import { getResponseType, prepareTypeOptions } from './utils';

export const SwaggerSafePost = (props?: SwaggerSafeOptions) => {
  const options = {
    ...props?.options,
    ...prepareTypeOptions(getResponseType(props?.options, props?.type)),
  };

  return applyDecorators(
    ApiCreatedResponse({
      description: `This endpoint creates records in the database`,
      ...options,
    }),
    NestPost(props?.path),
  );
};
