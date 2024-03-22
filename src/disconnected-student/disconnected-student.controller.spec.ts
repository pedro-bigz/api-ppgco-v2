import { Test, TestingModule } from '@nestjs/testing';
import { DisconnectedStudentController } from './disconnected-student.controller';
import { DisconnectedStudentService } from './disconnected-student.service';

describe('DisconnectedStudentController', () => {
  let controller: DisconnectedStudentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DisconnectedStudentController],
      providers: [DisconnectedStudentService],
    }).compile();

    controller = module.get<DisconnectedStudentController>(DisconnectedStudentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
