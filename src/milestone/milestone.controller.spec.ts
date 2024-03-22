import { Test, TestingModule } from '@nestjs/testing';
import { MilestoneController } from './milestone.controller';
import { MilestoneService } from './milestone.service';

describe('MilestoneController', () => {
  let controller: MilestoneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MilestoneController],
      providers: [MilestoneService],
    }).compile();

    controller = module.get<MilestoneController>(MilestoneController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
