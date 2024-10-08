import { Body, Query, Param } from '@nestjs/common';
import { ZodValidationPipe, OrderDto } from 'src/common';
import {
  SwaggerSafeController,
  SwaggerSafeDelete,
  SwaggerSafeGet,
  SwaggerSafePatch,
  SwaggerSafePost,
} from 'src/common';
import { UserHasPermissionsService } from './user-has-permissions.service';
import {
  CreateUserHasPermissionsDto,
  UpdateUserHasPermissionsDto,
  createUserHasPermissionsSchema,
  updateUserHasPermissionsSchema,
} from './dto';
import { UserHasPermission } from './entities';

@SwaggerSafeController('user-has-permissions')
export class UserHasPermissionsController {
  public constructor(
    private readonly userHasPermissionsService: UserHasPermissionsService,
  ) {}

  @SwaggerSafeGet({ type: UserHasPermission })
  public findAll(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('search') search: string,
    @Query('searchIn') searchIn: string,
    @Query('orderBy') order: OrderDto[],
  ) {
    return this.userHasPermissionsService.find(
      +page,
      +perPage,
      search,
      searchIn,
      order,
    );
  }

  @SwaggerSafeGet({ path: ':id', type: UserHasPermission })
  public findOne(@Param('id') id: string) {
    return this.userHasPermissionsService.findOne(+id);
  }

  @SwaggerSafePost({ type: UserHasPermission })
  public create(
    @Body(new ZodValidationPipe(createUserHasPermissionsSchema))
    createUserHasPermissionsDto: CreateUserHasPermissionsDto,
  ) {
    return this.userHasPermissionsService.create(createUserHasPermissionsDto);
  }

  @SwaggerSafePatch({ path: ':id' })
  public async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateUserHasPermissionsSchema))
    updateUserHasPermissionsDto: UpdateUserHasPermissionsDto,
  ) {
    const [updateds] = await this.userHasPermissionsService.update(
      +id,
      updateUserHasPermissionsDto,
    );
    return {
      updateds,
      message: 'Item atualizado com sucesso',
    };
  }

  @SwaggerSafeDelete({ path: ':id' })
  public async destroy(@Param('id') id: string) {
    const deleteds = await this.userHasPermissionsService.remove(+id);
    return {
      deleteds,
      message: 'Item deletado com sucesso',
    };
  }
}
