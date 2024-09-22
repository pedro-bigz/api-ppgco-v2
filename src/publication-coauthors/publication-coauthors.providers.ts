import { PublicationCoauthor } from './entities';
import { PUBLICATION_COAUTHORS_REPOSITORY } from './publication-coauthors.constants';

export const publicationCoauthorsProviders = [
  {
    provide: PUBLICATION_COAUTHORS_REPOSITORY,
    useValue: PublicationCoauthor,
  },
];
