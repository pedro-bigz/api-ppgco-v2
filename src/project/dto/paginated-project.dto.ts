import { PaginatedResponse } from 'src/common';
import { Project } from '../entities';
import { ApiProperty } from '@nestjs/swagger';

export class PaginatedProjectDto extends PaginatedResponse<Project> {
  @ApiProperty({ type: [Project] })
  data: Project[];
}
