import { Test, TestingModule } from '@nestjs/testing';
import { ActivationsService } from './activations.service';

describe('ActivationsService', () => {
  let service: ActivationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActivationsService],
    }).compile();

    service = module.get<ActivationsService>(ActivationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
