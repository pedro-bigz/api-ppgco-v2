import { Subject } from './entities';
import { SUBJECTS_REPOSITORY } from './subjects.constants';

export const subjectsProviders = [
  {
    provide: SUBJECTS_REPOSITORY,
    useValue: Subject,
  },
];
