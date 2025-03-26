import { PaginatedResponse } from 'src/core';
import { Course } from '../entities';
import { ApiProperty } from '@nestjs/swagger';

export class PaginatedCourseDto extends PaginatedResponse<Course> {
  @ApiProperty({ type: [Course] })
  data: Course[];
}
