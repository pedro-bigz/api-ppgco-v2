import { Notification, NotificationUsers } from './entities';
import {
  NOTIFICATIONS_REPOSITORY,
  NOTIFICATIONS_USERS_REPOSITORY,
} from './notifications.constants';

export const notificationsProviders = [
  {
    provide: NOTIFICATIONS_REPOSITORY,
    useValue: Notification,
  },
  {
    provide: NOTIFICATIONS_USERS_REPOSITORY,
    useValue: NotificationUsers,
  },
];
