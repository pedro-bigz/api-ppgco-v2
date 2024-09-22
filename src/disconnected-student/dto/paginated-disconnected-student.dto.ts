import { PaginatedResponse } from 'src/common';
import { DisconnectedStudent } from '../entities';
import { ApiProperty } from '@nestjs/swagger';

export class PaginatedDisconnectedStudentDto extends PaginatedResponse<DisconnectedStudent> {
  @ApiProperty({ type: [DisconnectedStudent] })
  data: DisconnectedStudent[];
}
