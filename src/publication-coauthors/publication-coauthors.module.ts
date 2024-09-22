import { Module } from '@nestjs/common';
import { PublicationCoauthorsService } from './publication-coauthors.service';
import { publicationCoauthorsProviders } from './publication-coauthors.providers';

@Module({
  providers: [PublicationCoauthorsService, ...publicationCoauthorsProviders],
  exports: [PublicationCoauthorsService],
})
export class PublicationCoauthorsModule {}
