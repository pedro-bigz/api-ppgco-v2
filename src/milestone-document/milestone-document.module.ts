import { Module } from '@nestjs/common';
import { MilestoneDocumentService } from './milestone-document.service';
import { milestoneDocumentProviders } from './milestone-document.providers';

@Module({
  providers: [MilestoneDocumentService, ...milestoneDocumentProviders],
  exports: [MilestoneDocumentService],
})
export class MilestoneDocumentModule {}
