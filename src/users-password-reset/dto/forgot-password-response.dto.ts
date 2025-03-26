import { ApiProperty } from "@nestjs/swagger";

export class ForgotPasswordResponseDto {
  @ApiProperty({ type: String })
  status: string
      
  @ApiProperty({ type: String })
  message: string;
}