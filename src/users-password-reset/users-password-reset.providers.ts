import { UsersPasswordReset } from './entities';
import { USERS_PASSWORD_RESET_REPOSITORY } from './users-password-reset.constants';

export const usersPasswordResetProviders = [
  {
    provide: USERS_PASSWORD_RESET_REPOSITORY,
    useValue: UsersPasswordReset,
  },
];
