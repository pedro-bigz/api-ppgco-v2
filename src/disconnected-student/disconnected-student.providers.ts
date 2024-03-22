import { DisconnectedStudent } from './entities';
import { DISCONNECTED_STUDENT_REPOSITORY } from './disconnected-student.constants';

export const disconnectedStudentProviders = [
  {
    provide: DISCONNECTED_STUDENT_REPOSITORY,
    useValue: DisconnectedStudent,
  },
];
