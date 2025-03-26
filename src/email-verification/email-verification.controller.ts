import { Controller, Get, Param } from '@nestjs/common';
import { Public } from 'src/core';
import { EmailVerificationService } from './email-verification.service';
import { EmailVerificationResponseDto } from './dto';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('activations')
export class EmailVerificationController {
  public constructor(
    private readonly emailVerificationService: EmailVerificationService,
  ) {}

  @Public()
  @Get(':token')
  @ApiOkResponse({ type: EmailVerificationResponseDto })
  public async emailVerification(@Param('token') token: string) {
    return this.emailVerificationService.activateAccount(token);
  }
}
