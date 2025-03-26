import { PaginatedResponse } from 'src/core';
import { MilestoneSituation } from '../entities';
import { ApiProperty } from '@nestjs/swagger';

export class PaginatedMilestoneSituationDto extends PaginatedResponse<MilestoneSituation> {
  @ApiProperty({ type: [MilestoneSituation] })
  data: MilestoneSituation[];
}
