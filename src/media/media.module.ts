import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { mediaProviders } from './media.providers';

@Module({
  providers: [MediaService, ...mediaProviders],
  exports: [MediaService],
})
export class MediaModule {}
