import { Module } from '@nestjs/common';
import { MilestoneHistoryService } from './milestone-history.service';
import { milestoneHistoryProviders } from './milestone-history.providers';

@Module({
  providers: [MilestoneHistoryService, ...milestoneHistoryProviders],
  exports: [MilestoneHistoryService],
})
export class MilestoneHistoryModule {}
