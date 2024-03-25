import {
  Body,
  Query,
  Param,
  Get,
  Patch,
  Post,
  Delete,
} from '@nestjs/common';
import { ZodValidationPipe, SwaggerSafeController } from 'core';
import { UserHasRolesService } from './user-has-roles.service';
import {
  CreateUserHasRolesDto,
  UpdateUserHasRolesDto,
  createUserHasRolesSchema,
  updateUserHasRolesSchema,
} from './dto';

@SwaggerSafeController('user-has-roles')
export class UserHasRolesController {
  public constructor(private readonly userHasRolesService: UserHasRolesService) {}

  @Get()
  public findAll(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('search') search: string,
    @Query('searchIn') searchIn: string,
    @Query('order') order: Record<string, 'ASC' | 'DESC'>,
  ) {
    return this.userHasRolesService.find(+page, +perPage, search, searchIn, order);
  }

  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.userHasRolesService.findOne(+id);
  }

  @Post()
  public create(
    @Body(new ZodValidationPipe(createUserHasRolesSchema))
    createUserHasRolesDto: CreateUserHasRolesDto,
  ) {
    return this.userHasRolesService.create(createUserHasRolesDto);
  }

  @Patch(':id')
  public update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateUserHasRolesSchema))
    updateUserHasRolesDto: UpdateUserHasRolesDto,
  ) {
    return this.userHasRolesService.update(+id, updateUserHasRolesDto);
  }

  @Delete(':id')
  public destroy(@Param('id') id: string) {
    return this.userHasRolesService.remove(+id);
  }
}
