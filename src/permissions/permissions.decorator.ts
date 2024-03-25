import { SetMetadata } from '@nestjs/common';

export const PERMISSION_KEY = 'permissions';
export const Can = (permission: string, guard: string = 'admin') =>
  SetMetadata(PERMISSION_KEY, [permission, guard]);
