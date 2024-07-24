import { Inject, Injectable, Type } from '@nestjs/common';
import { NotificationUsersStrategy } from './notification-user-strategy.interface';
import { Model, ModelStatic } from 'sequelize';
import { Advisor, AdvisorService } from 'src/advisor';
import _chunk from 'lodash/chunk';
import { NOTIFICATIONS_USERS_REPOSITORY } from './notifications.constants';
import { NotificationUsers } from './entities';

@Injectable()
export class NotifySomeAdvisors implements NotificationUsersStrategy {
  public constructor(
    @Inject(NOTIFICATIONS_USERS_REPOSITORY)
    private readonly notificationUsersModel: typeof NotificationUsers,
  ) {}

  public async notify(
    notificationId: number,
    ...advisorsId: number[]
  ): Promise<void> {
    const chunkedList = _chunk(advisorsId, 100);

    console.log({ notificationId, advisorsId, chunkedList });

    for (const chunkedIds of chunkedList) {
      await this.notificationUsersModel.bulkCreate(
        chunkedIds.map((advisorId: number) => ({
          notification_id: notificationId,
          user_id: advisorId,
        })),
      );
    }
  }
}
