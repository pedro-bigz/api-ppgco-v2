import { ApiProperty } from '@nestjs/swagger';

export class CreateActivationDto {
  constructor(props: Record<string, any>) {
    Object.assign(this, props);
    console.log(this);
  }

  @ApiProperty()
  email: string;

  @ApiProperty()
  token: string;

  @ApiProperty()
  used: boolean;
}
