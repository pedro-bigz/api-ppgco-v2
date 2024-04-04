import {
  Body,
  Post,
  HttpCode,
  HttpStatus,
  UsePipes,
  Get,
  Request,
} from '@nestjs/common';
import { ZodValidationPipe, SwaggerSafeController } from 'core';
import { AuthService } from './auth.service';
import {
  LoginDto,
  loginSchema,
  AuthResponseDto,
  CheckTokenResponseDto,
} from './dto';
import { Public } from './auth.decorator';
import { ApiOkResponse } from '@nestjs/swagger';
import { User } from '@app/user';

@SwaggerSafeController('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOkResponse({
    description: `This endpoint is used to autenticate`,
    type: AuthResponseDto,
  })
  @UsePipes(new ZodValidationPipe(loginSchema))
  public signIn(@Body() { email, password }: LoginDto) {
    return this.authService.signIn(email, password);
  }

  @Get('profile')
  @ApiOkResponse({
    description: `This endpoint gets logged in user`,
    type: User,
  })
  public getProfile(@Request() req: any) {
    return req.user;
  }

  @Post('check-token')
  @ApiOkResponse({
    description: `This endpoint checks the validity of the token `,
    type: CheckTokenResponseDto,
  })
  public check(@Request() req: any) {
    return this.authService.verify(req.headers.authorization);
  }

  @Post('refresh-token')
  @ApiOkResponse({
    description: `This endpoint updates access token`,
    type: AuthResponseDto,
  })
  public refresh(@Body() body: any) {
    console.log({ body });
    return this.authService.refresh(body);
  }
}
