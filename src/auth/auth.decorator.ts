import { Can } from '@app/permissions';
import {
  applyDecorators,
  CanActivate,
  SetMetadata,
  Type,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { PermissionGuard } from '@app/permissions/permissions.guard';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
export const Private = () => SetMetadata(IS_PUBLIC_KEY, false);
