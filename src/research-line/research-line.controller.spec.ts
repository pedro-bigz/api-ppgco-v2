import { Test, TestingModule } from '@nestjs/testing';
import { ResearchLineController } from './research-line.controller';
import { ResearchLineService } from './research-line.service';

describe('ResearchLineController', () => {
  let controller: ResearchLineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResearchLineController],
      providers: [ResearchLineService],
    }).compile();

    controller = module.get<ResearchLineController>(ResearchLineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
