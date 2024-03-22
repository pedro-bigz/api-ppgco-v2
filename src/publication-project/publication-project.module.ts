import { Module } from '@nestjs/common';
import { PublicationProjectService } from './publication-project.service';
import { publicationProjectProviders } from './publication-project.providers';

@Module({
  providers: [PublicationProjectService, ...publicationProjectProviders],
  exports: [PublicationProjectService],
})
export class PublicationProjectModule {}
