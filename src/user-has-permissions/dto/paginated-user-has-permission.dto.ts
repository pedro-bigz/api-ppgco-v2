import { PaginatedResponse } from 'src/core';
import { UserHasPermission } from '../entities';
import { ApiProperty } from '@nestjs/swagger';

export class PaginatedUserHasPermissionDto extends PaginatedResponse<UserHasPermission> {
  @ApiProperty({ type: [UserHasPermission] })
  data: UserHasPermission[];
}
