import { Inject, Injectable } from '@nestjs/common';
import _chunk from 'lodash/chunk';

import { CommonListing, CommonService, OrderDto, Query } from 'src/core';
import { Notification } from './entities';
import { CreateNotificationsDto, UpdateNotificationsDto } from './dto';
import { NOTIFICATIONS_REPOSITORY } from './notifications.constants';
import { NotifyAllAdvisors } from './notify-all-advisors.strategy';
import { NotifyAllStudents } from './notify-all-students.strategy';
import { NotifySomeStudents } from './notify-some-students.strategy';
import { NotifySomeAdvisors } from './notify-some-advisors.strategy';

@Injectable()
export class NotificationsService extends CommonService<
  Notification,
  typeof Notification
> {
  private readonly notifiers: {
    all_advisors?: NotifyAllAdvisors;
    all_students?: NotifyAllStudents;
    some_advisors?: NotifySomeAdvisors;
    some_students?: NotifySomeStudents;
  };

  public constructor(
    @Inject(NOTIFICATIONS_REPOSITORY) model: typeof Notification,
    private readonly notifyAllAdvisors: NotifyAllAdvisors,
    private readonly notifyAllStudents: NotifyAllStudents,
    private readonly notifySomeAdvisors: NotifySomeAdvisors,
    private readonly notifySomeStudents: NotifySomeStudents,
  ) {
    super(model);

    this.notifiers = {
      all_advisors: this.notifyAllAdvisors,
      all_students: this.notifyAllStudents,
      some_advisors: this.notifySomeAdvisors,
      some_students: this.notifySomeStudents,
    };
  }

  public findOneWithUsers(id: number) {
    return this.findOneByScope('withUsers', id);
  }

  public async create({
    notifieds,
    ...createNotificationsDto
  }: CreateNotificationsDto) {
    const notification = await this.model.create({
      ...createNotificationsDto,
    });

    const notifier = this.notifiers[notifieds.mode];
    const values = notifieds.values ?? [];

    await notifier.notify(notification.dataValues.id, ...values);
  }

  public update(id: number, updateNotificationsDto: UpdateNotificationsDto) {
    return this.model.update(updateNotificationsDto, {
      where: { id },
    });
  }
}
