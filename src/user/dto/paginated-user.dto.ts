import { PaginatedResponse } from 'core';
import { User } from '../entities';
import { ApiProperty } from '@nestjs/swagger';

export class PaginatedUserDto extends PaginatedResponse<User> {
  @ApiProperty({ type: [User] })
  data: User[];
}
