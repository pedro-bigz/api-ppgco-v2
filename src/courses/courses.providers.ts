import { Course } from './entities';
import { COURSES_REPOSITORY } from './courses.constants';

export const coursesProviders = [
  {
    provide: COURSES_REPOSITORY,
    useValue: Course,
  },
];
