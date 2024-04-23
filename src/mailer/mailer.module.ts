import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailerTransporter } from './mailer.transporter';

@Module({
  providers: [MailerService, MailerTransporter],
  exports: [MailerService],
})
export class MailerModule {}
