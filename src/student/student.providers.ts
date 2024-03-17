import { Student } from './entities';
import { STUDENT_REPOSITORY } from './student.constants';

export const studentProviders = [
  {
    provide: STUDENT_REPOSITORY,
    useValue: Student,
  },
];
