import { Test, TestingModule } from '@nestjs/testing';
import { UserHasRolesService } from './user-has-roles.service';

describe('UserHasRolesService', () => {
  let service: UserHasRolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserHasRolesService],
    }).compile();

    service = module.get<UserHasRolesService>(UserHasRolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
