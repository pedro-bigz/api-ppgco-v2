import { Inject, Injectable } from '@nestjs/common';
import _chunk from 'lodash/chunk';

import { AppListing, OrderDto, Query } from 'src/core';
import { Notification } from './entities';
import { CreateNotificationsDto, UpdateNotificationsDto } from './dto';
import { NOTIFICATIONS_REPOSITORY } from './notifications.constants';
import { NotifyAllAdvisors } from './notify-all-advisors.strategy';
import { NotifyAllStudents } from './notify-all-students.strategy';
import { NotifySomeStudents } from './notify-some-students.strategy';
import { NotifySomeAdvisors } from './notify-some-advisors.strategy';

@Injectable()
export class NotificationsService {
  public constructor(
    @Inject(NOTIFICATIONS_REPOSITORY)
    private readonly notificationModel: typeof Notification,
    private readonly notifyAllAdvisors: NotifyAllAdvisors,
    private readonly notifyAllStudents: NotifyAllStudents,
    private readonly notifySomeAdvisors: NotifySomeAdvisors,
    private readonly notifySomeStudents: NotifySomeStudents,
  ) {}

  public findAll() {
    return this.notificationModel.findAll();
  }

  public async find(
    page: number,
    perPage: number,
    search: string,
    searchIn: string = 'id',
    order: OrderDto[],
  ) {
    return AppListing.create<typeof Notification, Notification>(
      this.notificationModel,
    )
      ?.attachPagination(page, perPage)
      ?.attachMultipleOrder(order || [['id', 'DESC']])
      ?.attachSearch(search, searchIn)
      ?.modifyQuery((query: Query<Notification>) => {
        return {
          ...query,
        };
      })
      ?.get();
  }

  public findOne(id: number) {
    return this.notificationModel.findOne({ where: { id } });
  }

  public findOneWithUsers(id: number) {
    return this.notificationModel.scope('withUsers').findOne({ where: { id } });
  }

  public async create({
    notifieds,
    ...createNotificationsDto
  }: CreateNotificationsDto) {
    const notification = await this.notificationModel.create({
      ...createNotificationsDto,
    });

    const notifiers = {
      all_advisors: this.notifyAllAdvisors,
      all_students: this.notifyAllStudents,
      some_advisors: this.notifySomeAdvisors,
      some_students: this.notifySomeStudents,
    };

    console.log({ notifieds });

    const notifier = notifiers[notifieds.mode];
    const values = notifieds.values ?? [];

    console.log({ notifier, notifieds_values: notifieds.values, values });

    await notifier.notify(notification.dataValues.id, ...values);
  }

  public update(id: number, updateNotificationsDto: UpdateNotificationsDto) {
    return this.notificationModel.update(updateNotificationsDto, {
      where: { id },
    });
  }

  public remove(id: number) {
    return this.notificationModel.destroy({ where: { id } });
  }
}
