import { Module } from '@nestjs/common';
import { ProjectHasCoadvisorService } from './project-has-coadvisor.service';
import { projectHasCoadvisorProviders } from './project-has-coadvisor.providers';

@Module({
  providers: [ProjectHasCoadvisorService, ...projectHasCoadvisorProviders],
  exports: [ProjectHasCoadvisorService],
})
export class ProjectHasCoadvisorModule {}
