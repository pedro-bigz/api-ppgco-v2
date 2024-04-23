import { ApiProperty } from '@nestjs/swagger';

export class EmailVerificationResponseDto {
  @ApiProperty({ default: 'email verified successfully' })
  message: string;
}
