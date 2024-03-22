import { Test, TestingModule } from '@nestjs/testing';
import { ProjectHasCoadvisorService } from './project-has-coadvisor.service';

describe('ProjectHasCoadvisorService', () => {
  let service: ProjectHasCoadvisorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectHasCoadvisorService],
    }).compile();

    service = module.get<ProjectHasCoadvisorService>(
      ProjectHasCoadvisorService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
