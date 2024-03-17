import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export { UserPayload } from 'src/auth';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest().user;
  },
);
