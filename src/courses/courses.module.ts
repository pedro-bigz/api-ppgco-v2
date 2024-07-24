import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { coursesProviders } from './courses.providers';

@Module({
  controllers: [CoursesController],
  providers: [CoursesService, ...coursesProviders],
  exports: [CoursesService],
})
export class CoursesModule {}
