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
import { LoginDto, loginSchema } from './dto';
import { Public } from './auth.decorator';

@SwaggerSafeController('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UsePipes(new ZodValidationPipe(loginSchema))
  public signIn(@Body() { email, password }: LoginDto) {
    return this.authService.signIn(email, password);
  }

  @Get('profile')
  public getProfile(@Request() req: any) {
    return req.user;
  }

  @Post('check-token')
  public check(@Request() req: any) {
    return this.authService.verify(req.headers.authorization);
  }

  @Public()
  @Post('refresh')
  public refresh(@Body() body) {
    return this.authService.refresh(body);
  }
}
