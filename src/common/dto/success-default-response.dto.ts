import { ApiProperty } from '@nestjs/swagger';
import { string } from 'zod';

export class SuccessDefaultResponse {
  @ApiProperty()
  message: string;

  @ApiProperty({ type: String, default: 'success' })
  status: string;

  constructor(args: any) {
    Object.assign(this, args);
  }
}
