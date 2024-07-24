import { Module } from '@nestjs/common';
import { EmailVerificationService } from './email-verification.service';
import { EmailVerificationController } from './email-verification.controller';
import { UserModule } from 'src/user';
import { ActivationsModule } from 'src/activations';

@Module({
  imports: [UserModule, ActivationsModule],
  controllers: [EmailVerificationController],
  providers: [EmailVerificationService],
})
export class EmailVerificationModule {}
