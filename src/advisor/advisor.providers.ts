import { Advisor } from './entities';
import { ADVISOR_REPOSITORY } from './advisor.constants';

export const advisorProviders = [
  {
    provide: ADVISOR_REPOSITORY,
    useValue: Advisor,
  },
];
