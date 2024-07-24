import { Module } from '@nestjs/common';
import { MilestoneService } from './milestone.service';
import { MilestoneController } from './milestone.controller';
import { milestoneProviders } from './milestone.providers';
import { MilestoneDocumentModule } from 'src/milestone-document';
import { MilestoneHistoryModule } from 'src/milestone-history';
import { SystemApliancesModule } from 'src/system-apliances';
import { DefaultMilestonesModule } from 'src/default-milestones/default-milestones.module';

@Module({
  imports: [
    MilestoneDocumentModule,
    MilestoneHistoryModule,
    SystemApliancesModule,
    DefaultMilestonesModule,
  ],
  controllers: [MilestoneController],
  providers: [MilestoneService, ...milestoneProviders],
  exports: [MilestoneService],
})
export class MilestoneModule {}
