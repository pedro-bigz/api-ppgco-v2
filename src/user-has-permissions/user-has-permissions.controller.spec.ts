import { Test, TestingModule } from '@nestjs/testing';
import { UserHasPermissionsController } from './user-has-permissions.controller';
import { UserHasPermissionsService } from './user-has-permissions.service';

describe('UserHasPermissionsController', () => {
  let controller: UserHasPermissionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserHasPermissionsController],
      providers: [UserHasPermissionsService],
    }).compile();

    controller = module.get<UserHasPermissionsController>(UserHasPermissionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
