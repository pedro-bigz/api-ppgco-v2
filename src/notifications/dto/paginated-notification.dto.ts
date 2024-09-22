import { PaginatedResponse } from 'src/common';
import { Notification } from '../entities';
import { ApiProperty } from '@nestjs/swagger';

export class PaginatedNotificationDto extends PaginatedResponse<Notification> {
  @ApiProperty({ type: [Notification] })
  data: Notification[];
}
