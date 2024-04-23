import { PaginatedResponse } from '@app/core';
import { DisconnectedStudent } from '../entities';
import { ApiProperty } from '@nestjs/swagger';

export class PaginatedDisconnectedStudentDto extends PaginatedResponse<DisconnectedStudent> {
  @ApiProperty({ type: [DisconnectedStudent] })
  data: DisconnectedStudent[];
}
