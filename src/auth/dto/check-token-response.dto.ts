import { ApiProperty } from '@nestjs/swagger';

export class CheckTokenResponseDto {
  @ApiProperty()
  hasAccess: boolean;
}
