import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { projectProviders } from './project.providers';
import { ProjectHasCoadvisorModule } from 'src/project-has-coadvisor';

@Module({
  imports: [ProjectHasCoadvisorModule],
  controllers: [ProjectController],
  providers: [ProjectService, ...projectProviders],
  exports: [ProjectService],
})
export class ProjectModule {}
