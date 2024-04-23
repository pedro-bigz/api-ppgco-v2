import {
  Body,
  Post,
  HttpCode,
  HttpStatus,
  UsePipes,
  Get,
  Request,
  Head,
  UnauthorizedException,
} from '@nestjs/common';
import { ZodValidationPipe, SwaggerSafeController } from '@app/core';
import { AuthService } from './auth.service';
import {
  LoginDto,
  loginSchema,
  AuthResponseDto,
  CheckTokenResponseDto,
} from './dto';
import { BearerToken, Public } from './auth.decorator';
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

  @Public()
  @Head('check-token')
  @ApiOkResponse({
    description: `This endpoint checks the validity of the token `,
    type: CheckTokenResponseDto,
  })
  public async check(@BearerToken() token: string) {
    const { hasAccess } = await this.authService.verify(token);

    if (!hasAccess) {
      throw new UnauthorizedException();
    }

    return hasAccess;
  }

  @Post('refresh-token')
  @ApiOkResponse({
    description: `This endpoint updates access token`,
    type: AuthResponseDto,
  })
  public refresh(@Body() body: any) {
    return this.authService.refresh(body);
  }
}
