import { Student, VStudent } from './entities';
import { STUDENT_REPOSITORY, V_STUDENT_REPOSITORY } from './student.constants';

export const studentProviders = [
  {
    provide: STUDENT_REPOSITORY,
    useValue: Student,
  },
  {
    provide: V_STUDENT_REPOSITORY,
    useValue: VStudent,
  },
];
