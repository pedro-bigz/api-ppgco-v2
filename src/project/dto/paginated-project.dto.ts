import { PaginatedResponse } from 'core';
import { Project } from '../entities';
import { ApiProperty } from '@nestjs/swagger';

export class PaginatedProjectDto extends PaginatedResponse<Project> {
  @ApiProperty({ type: [Project] })
  data: Project[];
}
