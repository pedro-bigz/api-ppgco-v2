import { PaginatedResponse } from 'src/common';
import { Student } from '../entities';
import { ApiProperty } from '@nestjs/swagger';

export class PaginatedStudentDto extends PaginatedResponse<Student> {
  @ApiProperty({ type: [Student] })
  data: Student[];
}
