import { UserHasRole } from './entities';
import { USER_HAS_ROLES_REPOSITORY } from './user-has-roles.constants';

export const userHasRolesProviders = [
  {
    provide: USER_HAS_ROLES_REPOSITORY,
    useValue: UserHasRole,
  },
];
