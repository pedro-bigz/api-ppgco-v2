import { Test, TestingModule } from '@nestjs/testing';
import { UserHasPermissionsService } from './user-has-permissions.service';

describe('UserHasPermissionsService', () => {
  let service: UserHasPermissionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserHasPermissionsService],
    }).compile();

    service = module.get<UserHasPermissionsService>(UserHasPermissionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
