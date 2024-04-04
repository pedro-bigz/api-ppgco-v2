import { ApiProperty } from '@nestjs/swagger';
import { SuccessDefaultResponse } from './SuccessDefaultResponse';

export class DeleteSuccessResponse extends SuccessDefaultResponse {
  @ApiProperty()
  deleteds: number;

  @ApiProperty({ default: 'Deleted successfully' })
  message: string;
}
