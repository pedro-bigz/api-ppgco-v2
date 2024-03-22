import { Test, TestingModule } from '@nestjs/testing';
import { MilestoneService } from './milestone.service';

describe('MilestoneService', () => {
  let service: MilestoneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MilestoneService],
    }).compile();

    service = module.get<MilestoneService>(MilestoneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
