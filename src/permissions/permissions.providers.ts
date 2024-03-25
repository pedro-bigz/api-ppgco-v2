import { Permission } from './entities';
import {
  PERMISSIONS_REPOSITORY,
  PERMISSIONS_GUARD,
} from './permissions.constants';
import { PermissionGuard } from './permissions.guard';

export const permissionsProviders = [
  {
    provide: PERMISSIONS_REPOSITORY,
    useValue: Permission,
  },
  {
    provide: PERMISSIONS_GUARD,
    useClass: PermissionGuard,
  },
];
