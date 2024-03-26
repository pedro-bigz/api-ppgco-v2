import { applyDecorators, SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () =>
  applyDecorators(
    SetMetadata(IS_PUBLIC_KEY, true),
    SetMetadata('swagger/apiSecurity', [IS_PUBLIC_KEY]),
  );
export const Private = () => SetMetadata(IS_PUBLIC_KEY, false);
