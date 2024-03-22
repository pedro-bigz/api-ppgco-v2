import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { projectProviders } from './project.providers';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService, ...projectProviders],
})
export class ProjectModule {}
