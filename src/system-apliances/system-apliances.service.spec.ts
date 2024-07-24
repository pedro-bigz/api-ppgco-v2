import { Test, TestingModule } from '@nestjs/testing';
import { SystemApliancesService } from './system-apliances.service';

describe('SystemApliancesService', () => {
  let service: SystemApliancesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SystemApliancesService],
    }).compile();

    service = module.get<SystemApliancesService>(SystemApliancesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
