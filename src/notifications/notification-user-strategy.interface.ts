import { Type } from '@nestjs/common';
import { Model, ModelStatic } from 'sequelize';

export interface NotificationUsersStrategy {
  notify(notificationId: number, ...values: number[]): Promise<void>;
}
