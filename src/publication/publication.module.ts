import { Module } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { publicationProviders } from './publication.providers';
import { StudentModule } from 'src/student';
import { PublicationCoauthorsModule } from 'src/publication-coauthors';

@Module({
  imports: [StudentModule, PublicationCoauthorsModule],
  controllers: [PublicationController],
  providers: [PublicationService, ...publicationProviders],
})
export class PublicationModule {}
