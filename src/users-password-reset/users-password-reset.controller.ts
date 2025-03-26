import {
  Body,
  Param,
  NotFoundException,
  BadRequestException,
  Post,
  forwardRef,
  Inject,
  Controller,
  Get,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ZodValidationPipe } from 'nestjs-zod';
import dayjs from 'dayjs';
import _map from 'lodash/map';
import { UserService } from 'src/user';
import { Public } from 'src/core';
import {
  ForgotPasswordDto,
  forgotPasswordSchema,
  UsersPasswordResetService,
} from 'src/users-password-reset';
import { resetPasswordFormSchema, ResetPasswordSchemaDto } from './dto';
import { AuthService } from 'src/auth';

@Controller('reset-password')
export class UsersPasswordResetController {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly usersPasswordResetService: UsersPasswordResetService,
  ) {}

  @Public()
  @Post('/forgot-password')
  public async forgotPassword(
    @Body(new ZodValidationPipe(forgotPasswordSchema))
    { email }: ForgotPasswordDto,
  ) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new BadRequestException('Password reset link could not be sent');
    }

    await this.userService.sendForgotPasswordEmail(user);

    return {
      status: 'success',
      message: 'Password reset link has been sent',
    };
  }

  @Public()
  @Get('/validate-token/:token')
  public async validatePasswordResetToken(@Param('token') token: string) {
    const data = await this.usersPasswordResetService.findOne(token);

    if (!data) {
      throw new NotFoundException('Token não encontrado');
    }

    if (data.is_expired) {
      throw new BadRequestException('Token expirado');
    }

    const createdAt = dayjs(data.created_at);
    const expiresIn = this.configService.get('PASSWORD_RESET_TOKEN_EXPIRATION');

    console.log({
      expiresIn,
      createdAt: dayjs(data.created_at).format('YYYY-MM-DD HH:mm:ssZ[Z]'),
      expires: dayjs(data.created_at)
        .add(expiresIn, 'second')
        .format('YYYY-MM-DD HH:mm:ssZ[Z]'),
      now: dayjs().format('YYYY-MM-DD HH:mm:ssZ[Z]'),
    });

    if (dayjs().isAfter(createdAt.add(expiresIn, 'second'))) {
      this.usersPasswordResetService.setAsExpired(data);
      throw new BadRequestException('Token expirado');
    }

    if (data.is_validated) {
      throw new BadRequestException('Token inválido');
    }

    await this.usersPasswordResetService.setAsValidated(data);

    return {
      success: true,
      status: 'success',
      message: 'Token validated successfully',
    };
  }

  @Public()
  @Post('/:token')
  public async resetPassword(
    @Param('token') token: string,
    @Body(new ZodValidationPipe(resetPasswordFormSchema))
    form: ResetPasswordSchemaDto,
  ) {
    const data = await this.usersPasswordResetService.findOne(token);

    if (!data) {
      throw new NotFoundException('Token não encontrado');
    }

    if (data.is_expired) {
      throw new BadRequestException('Token expirado');
    }

    if (!data.is_validated) {
      await this.usersPasswordResetService.setAsValidated(data);
    }

    const user = await this.userService.findByEmail(data.email);

    if (!user) {
      throw new NotFoundException('Registro não encontrado');
    }

    await this.userService.updatePassword(user.id, form.password);

    return this.authService.signIn(user.email, form.password);
  }
}
