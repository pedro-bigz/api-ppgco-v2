import { Publication, VPublication } from './entities';
import {
  PUBLICATION_REPOSITORY,
  V_PUBLICATION_REPOSITORY,
} from './publication.constants';

export const publicationProviders = [
  {
    provide: PUBLICATION_REPOSITORY,
    useValue: Publication,
  },
  {
    provide: V_PUBLICATION_REPOSITORY,
    useValue: VPublication,
  },
];
