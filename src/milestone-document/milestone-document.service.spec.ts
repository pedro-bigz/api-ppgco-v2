import { Test, TestingModule } from '@nestjs/testing';
import { MilestoneDocumentService } from './milestone-document.service';

describe('MilestoneDocumentService', () => {
  let service: MilestoneDocumentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MilestoneDocumentService],
    }).compile();

    service = module.get<MilestoneDocumentService>(MilestoneDocumentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
