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
import { ApiOkResponse } from '@nestjs/swagger';
import _map from 'lodash/map';
import { ZodValidationPipe, SwaggerSafeController } from 'src/core';
import { User } from 'src/user';
import { Permission, PermissionsService } from 'src/permissions';
import { AuthService } from './auth.service';
import {
  LoginDto,
  loginSchema,
  AuthResponseDto,
  CheckTokenResponseDto,
  refreshTokenSchema,
  RefreshTokenDto,
} from './dto';
import { BearerToken, Public } from './auth.decorator';

@SwaggerSafeController('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly permissionService: PermissionsService,
  ) {}

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
  public async getProfile(@Request() req: any) {
    const { user } = req;

    const permissions = await this.permissionService
      .getUserPermissions(user)
      .then((permissions: Permission[]) => {
        return permissions.map(({ name }) => name);
      });

    const { roles, ...userData } = user;

    return {
      ...userData,
      permissions,
      roles: _map(roles, 'name'),
    };
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
  public refresh(
    @Body(new ZodValidationPipe(refreshTokenSchema)) body: RefreshTokenDto,
  ) {
    return this.authService.refresh(body);
  }
}
