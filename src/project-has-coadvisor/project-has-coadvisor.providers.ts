import { ProjectHasCoadvisor } from './entities';
import { PROJECT_HAS_COADVISOR_REPOSITORY } from './project-has-coadvisor.constants';

export const projectHasCoadvisorProviders = [
  {
    provide: PROJECT_HAS_COADVISOR_REPOSITORY,
    useValue: ProjectHasCoadvisor,
  },
];
