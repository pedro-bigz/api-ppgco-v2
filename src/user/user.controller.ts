import { Body, Param, Query } from '@nestjs/common';
import {
  DeleteSuccessResponse,
  SwaggerSafeController,
  SwaggerSafeDelete,
  SwaggerSafeGet,
  SwaggerSafePatch,
  SwaggerSafePost,
  UpdateSuccessResponse,
} from 'core';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './entities';
import { SwaggerResponseType } from 'core/Common/Response/SwaggerResponseType';
import { Can } from '@app/permissions';
import { RequestUser } from './user.decorator';
import { PaginatedUserDto } from './dto';

@SwaggerSafeController('user')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @SwaggerSafePost({ type: User })
  public create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @SwaggerSafeGet({ type: PaginatedUserDto })
  @Can('user.list')
  public findAll(
    @RequestUser() user: User,
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('search') search: string,
    @Query('searchIn') searchIn: string,
    @Query('order') order: Record<string, 'ASC' | 'DESC'>,
  ) {
    return this.userService.find(+page, +perPage, search, searchIn, order);
  }

  @SwaggerSafeGet({ path: ':id', type: User })
  public findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @SwaggerSafePatch({ path: ':id', type: UpdateSuccessResponse })
  public update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updateds = this.userService.update(+id, updateUserDto);

    return {
      status: 'success',
      message: 'User updated successfully',
      updateds,
    };
  }

  @SwaggerSafeDelete({ path: ':id', type: DeleteSuccessResponse })
  public remove(@Param('id') id: string) {
    const deleteds = this.userService.remove(+id);
    return {
      status: 'success',
      message: 'User deleted successfully',
      deleteds,
    };
  }
}
