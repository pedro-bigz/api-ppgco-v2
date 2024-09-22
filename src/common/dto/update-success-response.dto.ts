import { ApiProperty } from '@nestjs/swagger';
import { SuccessDefaultResponse } from './success-default-response.dto';

export class UpdateSuccessResponse extends SuccessDefaultResponse {
  @ApiProperty()
  updateds: number;

  @ApiProperty({ default: 'Updated successfully' })
  message: string;
}
