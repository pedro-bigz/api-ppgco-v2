import { Module } from '@nestjs/common';
import { AdvisorService } from './advisor.service';
import { AdvisorController } from './advisor.controller';
import { advisorProviders } from './advisor.providers';
import { UserModule } from 'src/user';
import { MailerModule } from 'src/mailer';

@Module({
  imports: [UserModule, MailerModule],
  controllers: [AdvisorController],
  providers: [AdvisorService, ...advisorProviders],
  exports: [AdvisorService],
})
export class AdvisorModule {}
