import { PaginatedResponse } from 'src/common';
import { Subject } from '../entities';
import { ApiProperty } from '@nestjs/swagger';

export class PaginatedSubjectDto extends PaginatedResponse<Subject> {
  @ApiProperty({ type: [Subject] })
  data: Subject[];
}
