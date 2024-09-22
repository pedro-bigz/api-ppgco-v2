import { PaginatedResponse } from 'src/common';
import { Role } from '../entities';
import { ApiProperty } from '@nestjs/swagger';

export class PaginatedRoleDto extends PaginatedResponse<Role> {
  @ApiProperty({ type: [Role] })
  data: Role[];
}
