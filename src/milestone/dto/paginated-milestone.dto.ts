import { PaginatedResponse } from 'src/core';
import { Milestone } from '../entities';
import { ApiProperty } from '@nestjs/swagger';

export class PaginatedMilestoneDto extends PaginatedResponse<Milestone> {
  @ApiProperty({ type: [Milestone] })
  data: Milestone[];
}
