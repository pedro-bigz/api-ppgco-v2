import { Test, TestingModule } from '@nestjs/testing';
import { DisconnectedStudentService } from './disconnected-student.service';

describe('DisconnectedStudentService', () => {
  let service: DisconnectedStudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DisconnectedStudentService],
    }).compile();

    service = module.get<DisconnectedStudentService>(DisconnectedStudentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
