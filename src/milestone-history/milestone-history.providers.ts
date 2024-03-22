import { MilestoneHistory } from './entities';
import { MILESTONE_HISTORY_REPOSITORY } from './milestone-history.constants';

export const milestoneHistoryProviders = [
  {
    provide: MILESTONE_HISTORY_REPOSITORY,
    useValue: MilestoneHistory,
  },
];
