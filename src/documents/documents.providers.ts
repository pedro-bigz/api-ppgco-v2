import { Document } from './entities';
import { DOCUMENTS_REPOSITORY } from './documents.constants';

export const documentsProviders = [
  {
    provide: DOCUMENTS_REPOSITORY,
    useValue: Document,
  },
];
