import { Milestone } from './entities';
import { MILESTONE_REPOSITORY } from './milestone.constants';

export const milestoneProviders = [
  {
    provide: MILESTONE_REPOSITORY,
    useValue: Milestone,
  },
];
