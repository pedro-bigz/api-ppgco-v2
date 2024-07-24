import { MilestoneSituation } from './entities';
import { MILESTONE_SITUATION_REPOSITORY } from './milestone-situation.constants';

export const milestoneSituationProviders = [
  {
    provide: MILESTONE_SITUATION_REPOSITORY,
    useValue: MilestoneSituation,
  },
];
