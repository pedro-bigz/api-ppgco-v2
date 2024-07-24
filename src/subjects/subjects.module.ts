import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { subjectsProviders } from './subjects.providers';

@Module({
  controllers: [SubjectsController],
  providers: [SubjectsService, ...subjectsProviders],
})
export class SubjectsModule {}
