import { UserHasPermission } from './entities';
import { USER_HAS_PERMISSIONS_REPOSITORY } from './user-has-permissions.constants';

export const userHasPermissionsProviders = [
  {
    provide: USER_HAS_PERMISSIONS_REPOSITORY,
    useValue: UserHasPermission,
  },
];
