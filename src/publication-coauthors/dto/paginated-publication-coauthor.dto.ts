import { PaginatedResponse } from 'src/core';
import { PublicationCoauthor } from '../entities';
import { ApiProperty } from '@nestjs/swagger';

export class PaginatedPublicationCoauthorDto extends PaginatedResponse<PublicationCoauthor> {
  @ApiProperty({ type: [PublicationCoauthor] })
  data: PublicationCoauthor[];
}
