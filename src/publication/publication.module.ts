import { Module } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { publicationProviders } from './publication.providers';
import { PublicationProjectModule } from 'src/publication-project';
import { StudentModule } from 'src/student';

@Module({
  imports: [StudentModule, PublicationProjectModule],
  controllers: [PublicationController],
  providers: [PublicationService, ...publicationProviders],
})
export class PublicationModule {}
