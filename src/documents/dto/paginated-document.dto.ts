import { PaginatedResponse } from 'src/common';
import { Document } from '../entities';
import { ApiProperty } from '@nestjs/swagger';

export class PaginatedDocumentDto extends PaginatedResponse<Document> {
  @ApiProperty({ type: [Document] })
  data: Document[];
}
