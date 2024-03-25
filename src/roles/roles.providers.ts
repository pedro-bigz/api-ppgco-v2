import { Role } from './entities';
import { ROLES_REPOSITORY } from './roles.constants';

export const rolesProviders = [
  {
    provide: ROLES_REPOSITORY,
    useValue: Role,
  },
];
