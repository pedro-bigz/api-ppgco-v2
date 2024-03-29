import { Controller as NestController, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import _capitalize from 'lodash/capitalize';

const resolveTagName = (name: string) => {
  return name.split('-').map(_capitalize).join(' ');
};

export const SwaggerSafeController = (name: string) => {
  return applyDecorators(
    ApiTags(resolveTagName(name)),
    ApiBearerAuth(),
    NestController(name),
  );
};
