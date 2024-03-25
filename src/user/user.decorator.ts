import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User as UserModel } from './entities';

export const RequestUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserModel => {
    return ctx.switchToHttp().getRequest().user;
  },
);
