import { Module } from '@nestjs/common';
import { ResearchLineService } from './research-line.service';
import { ResearchLineController } from './research-line.controller';
import { researchLineProviders } from './research-line.providers';

@Module({
  controllers: [ResearchLineController],
  providers: [ResearchLineService, ...researchLineProviders],
})
export class ResearchLineModule {}
