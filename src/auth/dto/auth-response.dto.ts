import { User } from '@app/user';
import { ApiProperty } from '@nestjs/swagger';
import { AuthDto } from './auth.dto';

export class AuthResponseDto {
  @ApiProperty({ type: AuthDto })
  auth: AuthDto;

  @ApiProperty({ type: User })
  user: User;
}
