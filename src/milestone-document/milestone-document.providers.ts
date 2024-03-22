import { MilestoneDocument } from './entities';
import { MILESTONE_DOCUMENT_REPOSITORY } from './milestone-document.constants';

export const milestoneDocumentProviders = [
  {
    provide: MILESTONE_DOCUMENT_REPOSITORY,
    useValue: MilestoneDocument,
  },
];
