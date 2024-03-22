import { Test, TestingModule } from '@nestjs/testing';
import { PublicationProjectService } from './publication-project.service';

describe('PublicationProjectService', () => {
  let service: PublicationProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PublicationProjectService],
    }).compile();

    service = module.get<PublicationProjectService>(PublicationProjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
