import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { notificationsProviders } from './notifications.providers';
import { AdvisorModule } from 'src/advisor';
import { StudentModule } from 'src/student';
import { NotifyAllAdvisors } from './notify-all-advisors.strategy';
import { NotifyAllStudents } from './notify-all-students.strategy';
import { NotifySomeAdvisors } from './notify-some-advisors.strategy';
import { NotifySomeStudents } from './notify-some-students.strategy';

@Module({
  imports: [AdvisorModule, StudentModule],
  controllers: [NotificationsController],
  providers: [
    NotificationsService,
    NotifyAllAdvisors,
    NotifyAllStudents,
    NotifySomeAdvisors,
    NotifySomeStudents,
    ...notificationsProviders,
  ],
})
export class NotificationsModule {}
