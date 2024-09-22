import { Advisor, VAdvisor } from './entities';
import { ADVISOR_REPOSITORY, V_ADVISOR_REPOSITORY } from './advisor.constants';

export const advisorProviders = [
  {
    provide: ADVISOR_REPOSITORY,
    useValue: Advisor,
  },
  {
    provide: V_ADVISOR_REPOSITORY,
    useValue: VAdvisor,
  },
];
