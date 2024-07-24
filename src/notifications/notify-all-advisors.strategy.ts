import { Inject, Injectable, Type } from '@nestjs/common';
import _chunk from 'lodash/chunk';
import { Model, ModelStatic } from 'sequelize';
import { Advisor, AdvisorService } from 'src/advisor';
import { NotificationUsersStrategy } from './notification-user-strategy.interface';
import { NOTIFICATIONS_USERS_REPOSITORY } from './notifications.constants';
import { NotificationUsers } from './entities';

@Injectable()
export class NotifyAllAdvisors implements NotificationUsersStrategy {
  public constructor(
    @Inject(NOTIFICATIONS_USERS_REPOSITORY)
    private readonly notificationUsersModel: typeof NotificationUsers,
    private readonly advisorsService: AdvisorService,
  ) {}

  public async notify(notificationId: number): Promise<void> {
    const advisorsId = await this.advisorsService.findAll({
      attributes: ['id'],
    });

    const chunkedList = _chunk(advisorsId, 100);

    for (const chunkedIds of chunkedList) {
      await this.notificationUsersModel.bulkCreate(
        chunkedIds.map((advisor: Advisor) => ({
          notification_id: notificationId,
          user_id: advisor.dataValues.id,
        })),
      );
    }
  }
}
