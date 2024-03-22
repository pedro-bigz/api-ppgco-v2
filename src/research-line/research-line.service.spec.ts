import { Test, TestingModule } from '@nestjs/testing';
import { ResearchLineService } from './research-line.service';

describe('ResearchLineService', () => {
  let service: ResearchLineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResearchLineService],
    }).compile();

    service = module.get<ResearchLineService>(ResearchLineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
