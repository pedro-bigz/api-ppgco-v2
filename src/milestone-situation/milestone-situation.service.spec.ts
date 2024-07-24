import { Test, TestingModule } from '@nestjs/testing';
import { MilestoneSituationService } from './milestone-situation.service';

describe('MilestoneSituationService', () => {
  let service: MilestoneSituationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MilestoneSituationService],
    }).compile();

    service = module.get<MilestoneSituationService>(MilestoneSituationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
