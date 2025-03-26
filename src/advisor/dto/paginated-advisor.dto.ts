import { PaginatedResponse } from 'src/core';
import { Advisor } from '../entities';
import { ApiProperty } from '@nestjs/swagger';

export class PaginatedAdvisorDto extends PaginatedResponse<Advisor> {
  @ApiProperty({ type: [Advisor] })
  data: Advisor[];
}
