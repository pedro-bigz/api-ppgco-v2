import { Test, TestingModule } from '@nestjs/testing';
import { AdvisorController } from './advisor.controller';
import { AdvisorService } from './advisor.service';

describe('AdvisorController', () => {
  let controller: AdvisorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdvisorController],
      providers: [AdvisorService],
    }).compile();

    controller = module.get<AdvisorController>(AdvisorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
