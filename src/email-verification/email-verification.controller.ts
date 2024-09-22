import { Param } from '@nestjs/common';
import { SwaggerSafeController, SwaggerSafeGet } from 'src/common';
import { Public } from 'src/auth';
import { EmailVerificationService } from './email-verification.service';
import { EmailVerificationResponseDto } from './dto';

@SwaggerSafeController('activations')
export class EmailVerificationController {
  public constructor(
    private readonly emailVerificationService: EmailVerificationService,
  ) {}

  @Public()
  @SwaggerSafeGet({
    path: ':token',
    type: EmailVerificationResponseDto,
  })
  public async emailVerification(@Param('token') token: string) {
    return this.emailVerificationService.activateAccount(token);
  }
}
