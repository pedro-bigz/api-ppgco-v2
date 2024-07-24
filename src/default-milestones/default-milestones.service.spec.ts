import { Test, TestingModule } from '@nestjs/testing';
import { DefaultMilestonesService } from './default-milestones.service';

describe('DefaultMilestonesService', () => {
  let service: DefaultMilestonesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultMilestonesService],
    }).compile();

    service = module.get<DefaultMilestonesService>(DefaultMilestonesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
