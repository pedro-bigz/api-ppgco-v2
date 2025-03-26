import { ApiProperty } from '@nestjs/swagger';
import { SuccessDefaultResponse } from './success-default-response.dto';

export class DeleteSuccessResponse extends SuccessDefaultResponse {
  @ApiProperty()
  deleteds: number;

  @ApiProperty({ default: 'Deleted successfully' })
  message: string;
}
