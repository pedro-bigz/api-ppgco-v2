import { PaginatedResponse } from 'src/common';
import { UserHasPermission } from '../entities';
import { ApiProperty } from '@nestjs/swagger';

export class PaginatedUserHasPermissionDto extends PaginatedResponse<UserHasPermission> {
  @ApiProperty({ type: [UserHasPermission] })
  data: UserHasPermission[];
}
