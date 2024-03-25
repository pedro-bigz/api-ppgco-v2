import { Test, TestingModule } from '@nestjs/testing';
import { UserHasRolesController } from './user-has-roles.controller';
import { UserHasRolesService } from './user-has-roles.service';

describe('UserHasRolesController', () => {
  let controller: UserHasRolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserHasRolesController],
      providers: [UserHasRolesService],
    }).compile();

    controller = module.get<UserHasRolesController>(UserHasRolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
