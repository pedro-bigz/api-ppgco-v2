import { Inject, Injectable, Type } from '@nestjs/common';
import { NotificationUsersStrategy } from './notification-user-strategy.interface';
import { Model, ModelStatic } from 'sequelize';
import { Student, StudentService } from 'src/student';
import _chunk from 'lodash/chunk';
import { NOTIFICATIONS_USERS_REPOSITORY } from './notifications.constants';
import { NotificationUsers } from './entities';

@Injectable()
export class NotifySomeStudents implements NotificationUsersStrategy {
  public constructor(
    @Inject(NOTIFICATIONS_USERS_REPOSITORY)
    private readonly notificationUsersModel: typeof NotificationUsers,
  ) {}

  public async notify(
    notificationId: number,
    ...studentsUserId: number[]
  ): Promise<void> {
    const chunkedList = _chunk(studentsUserId, 100);

    for (const chunkedIds of chunkedList) {
      await this.notificationUsersModel.bulkCreate(
        chunkedIds.map((studentId: number) => ({
          notification_id: notificationId,
          user_id: studentId,
        })),
      );
    }
  }
}
