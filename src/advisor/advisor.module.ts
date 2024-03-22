import { Module } from '@nestjs/common';
import { AdvisorService } from './advisor.service';
import { AdvisorController } from './advisor.controller';
import { advisorProviders } from './advisor.providers';

@Module({
  controllers: [AdvisorController],
  providers: [AdvisorService, ...advisorProviders],
})
export class AdvisorModule {}
