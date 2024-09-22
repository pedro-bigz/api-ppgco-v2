import { Subject, VSubject } from './entities';
import { SUBJECTS_REPOSITORY, V_SUBJECTS_REPOSITORY } from './subjects.constants';

export const subjectsProviders = [
  {
    provide: SUBJECTS_REPOSITORY,
    useValue: Subject,
  },
  {
    provide: V_SUBJECTS_REPOSITORY,
    useValue: VSubject,
  },
];
