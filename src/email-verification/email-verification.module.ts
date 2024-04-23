import { Module } from '@nestjs/common';
import { EmailVerificationService } from './email-verification.service';
import { EmailVerificationController } from './email-verification.controller';
import { UserModule } from '@app/user';
import { ActivationsModule } from 'src/activations';

@Module({
  imports: [UserModule, ActivationsModule],
  controllers: [EmailVerificationController],
  providers: [EmailVerificationService],
})
export class EmailVerificationModule {}
