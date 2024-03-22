import { Module } from '@nestjs/common';
import { MilestoneService } from './milestone.service';
import { MilestoneController } from './milestone.controller';
import { milestoneProviders } from './milestone.providers';
import { MilestoneDocumentModule } from '@app/milestone-document';
import { MilestoneHistoryModule } from '@app/milestone-history';

@Module({
  imports: [MilestoneDocumentModule, MilestoneHistoryModule],
  controllers: [MilestoneController],
  providers: [MilestoneService, ...milestoneProviders],
})
export class MilestoneModule {}
