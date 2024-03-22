import { Project } from './entities';
import { PROJECT_REPOSITORY } from './project.constants';

export const projectProviders = [
  {
    provide: PROJECT_REPOSITORY,
    useValue: Project,
  },
];
