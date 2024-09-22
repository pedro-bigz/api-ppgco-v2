import { PaginatedResponse } from 'src/common';
import { ResearchLine } from '../entities';
import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResearchLineDto extends PaginatedResponse<ResearchLine> {
  @ApiProperty({ type: [ResearchLine] })
  data: ResearchLine[];
}
