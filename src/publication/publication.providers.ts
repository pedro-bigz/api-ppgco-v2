import { Publication } from './entities';
import { PUBLICATION_REPOSITORY } from './publication.constants';

export const publicationProviders = [
  {
    provide: PUBLICATION_REPOSITORY,
    useValue: Publication,
  },
];
