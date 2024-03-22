import { PublicationProject } from './entities';
import { PUBLICATION_PROJECT_REPOSITORY } from './publication-project.constants';

export const publicationProjectProviders = [
  {
    provide: PUBLICATION_PROJECT_REPOSITORY,
    useValue: PublicationProject,
  },
];
