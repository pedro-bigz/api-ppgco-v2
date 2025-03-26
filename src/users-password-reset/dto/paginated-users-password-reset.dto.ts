import { PaginatedResponse } from 'src/core';
import { UsersPasswordReset } from '../entities';
import { ApiProperty } from '@nestjs/swagger';

export class PaginatedUsersPasswordResetDto extends PaginatedResponse<UsersPasswordReset> {
  @ApiProperty({ type: [UsersPasswordReset] })
  data: UsersPasswordReset[];
}
