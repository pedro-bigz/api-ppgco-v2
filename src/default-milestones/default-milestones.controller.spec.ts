import { Test, TestingModule } from '@nestjs/testing';
import { DefaultMilestonesController } from './default-milestones.controller';
import { DefaultMilestonesService } from './default-milestones.service';

describe('DefaultMilestonesController', () => {
  let controller: DefaultMilestonesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DefaultMilestonesController],
      providers: [DefaultMilestonesService],
    }).compile();

    controller = module.get<DefaultMilestonesController>(DefaultMilestonesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
