import { Test, TestingModule } from '@nestjs/testing';
import { PublicationCoauthorsService } from './publication-coauthors.service';

describe('PublicationCoauthorsService', () => {
  let service: PublicationCoauthorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PublicationCoauthorsService],
    }).compile();

    service = module.get<PublicationCoauthorsService>(PublicationCoauthorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
