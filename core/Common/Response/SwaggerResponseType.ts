import { Type } from '@nestjs/common';

export const SwaggerResponseType = (
  type: Type<unknown> | Function | [Function] | string,
) => ({ options: { type } });
