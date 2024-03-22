import { Test, TestingModule } from '@nestjs/testing';
import { MilestoneHistoryService } from './milestone-history.service';

describe('MilestoneHistoryService', () => {
  let service: MilestoneHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MilestoneHistoryService],
    }).compile();

    service = module.get<MilestoneHistoryService>(MilestoneHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
