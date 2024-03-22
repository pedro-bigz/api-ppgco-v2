import { ResearchLine } from './entities';
import { RESEARCH_LINE_REPOSITORY } from './research-line.constants';

export const researchLineProviders = [
  {
    provide: RESEARCH_LINE_REPOSITORY,
    useValue: ResearchLine,
  },
];
