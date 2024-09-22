import { Milestone, VMilestone } from './entities';
import {
  MILESTONE_REPOSITORY,
  V_MILESTONE_REPOSITORY,
} from './milestone.constants';

export const milestoneProviders = [
  {
    provide: MILESTONE_REPOSITORY,
    useValue: Milestone,
  },
  {
    provide: V_MILESTONE_REPOSITORY,
    useValue: VMilestone,
  },
];
