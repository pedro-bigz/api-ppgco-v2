import { Test, TestingModule } from '@nestjs/testing';
import { UsersPasswordResetService } from './users-password-reset.service';

describe('UsersPasswordResetService', () => {
  let service: UsersPasswordResetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersPasswordResetService],
    }).compile();

    service = module.get<UsersPasswordResetService>(UsersPasswordResetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
