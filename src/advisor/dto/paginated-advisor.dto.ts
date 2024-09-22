import { PaginatedResponse } from 'src/common';
import { Advisor } from '../entities';
import { ApiProperty } from '@nestjs/swagger';

export class PaginatedAdvisorDto extends PaginatedResponse<Advisor> {
  @ApiProperty({ type: [Advisor] })
  data: Advisor[];
}
