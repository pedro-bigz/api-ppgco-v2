import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { documentsProviders } from './documents.providers';

@Module({
  controllers: [DocumentsController],
  providers: [DocumentsService, ...documentsProviders],
})
export class DocumentsModule {}
