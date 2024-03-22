import { Test, TestingModule } from '@nestjs/testing';
import { AdvisorService } from './advisor.service';

describe('AdvisorService', () => {
  let service: AdvisorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdvisorService],
    }).compile();

    service = module.get<AdvisorService>(AdvisorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
