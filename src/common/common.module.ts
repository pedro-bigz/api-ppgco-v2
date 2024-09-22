import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonListing } from './common.listing';
import { ZodValidationPipe } from './pipes';

@Module({
  providers: [CommonService, CommonListing, ZodValidationPipe],
  exports: [CommonService, CommonListing, ZodValidationPipe],
})
export class GeneralModule {}
