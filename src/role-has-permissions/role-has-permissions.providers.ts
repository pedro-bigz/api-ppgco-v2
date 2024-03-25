import { RoleHasPermission } from './entities';
import { ROLE_HAS_PERMISSIONS_REPOSITORY } from './role-has-permissions.constants';

export const roleHasPermissionsProviders = [
  {
    provide: ROLE_HAS_PERMISSIONS_REPOSITORY,
    useValue: RoleHasPermission,
  },
];
