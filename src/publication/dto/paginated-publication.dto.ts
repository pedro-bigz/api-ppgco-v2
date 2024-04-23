import { PaginatedResponse } from '@app/core';
import { Publication } from '../entities';
import { ApiProperty } from '@nestjs/swagger';

export class PaginatedPublicationDto extends PaginatedResponse<Publication> {
  @ApiProperty({ type: [Publication] })
  data: Publication[];
}
