import { PaginatedResponse } from 'core';
import { ResearchLine } from '../entities';
import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResearchLineDto extends PaginatedResponse<ResearchLine> {
  @ApiProperty({ type: [ResearchLine] })
  data: ResearchLine[];
}
