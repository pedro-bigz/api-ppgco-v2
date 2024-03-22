import { Module } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { publicationProviders } from './publication.providers';
import { PublicationProjectModule } from '@app/publication-project';

@Module({
  imports: [PublicationProjectModule],
  controllers: [PublicationController],
  providers: [PublicationService, ...publicationProviders],
})
export class PublicationModule {}
