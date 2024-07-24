import { Test, TestingModule } from '@nestjs/testing';
import { MilestoneSituationController } from './milestone-situation.controller';
import { MilestoneSituationService } from './milestone-situation.service';

describe('MilestoneSituationController', () => {
  let controller: MilestoneSituationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MilestoneSituationController],
      providers: [MilestoneSituationService],
    }).compile();

    controller = module.get<MilestoneSituationController>(MilestoneSituationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
