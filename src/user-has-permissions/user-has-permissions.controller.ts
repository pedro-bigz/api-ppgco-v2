import {
  Body,
  Query,
  Param,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import { ZodValidationPipe, OrderDto } from 'src/core';
import { UserHasPermissionsService } from './user-has-permissions.service';
import {
  CreateUserHasPermissionsDto,
  UpdateUserHasPermissionsDto,
  createUserHasPermissionsSchema,
  updateUserHasPermissionsSchema,
} from './dto';
import { UserHasPermission } from './entities';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('user-has-permissions')
export class UserHasPermissionsController {
  public constructor(
    private readonly userHasPermissionsService: UserHasPermissionsService,
  ) {}

  @ApiOkResponse({ type: UserHasPermission })
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

  @Get(':id')
  @ApiOkResponse({ type: UserHasPermission })
  public findOne(@Param('id') id: string) {
    return this.userHasPermissionsService.findOne(+id);
  }

  @Post()
  @ApiCreatedResponse({ type: UserHasPermission })
  public create(
    @Body(new ZodValidationPipe(createUserHasPermissionsSchema))
    createUserHasPermissionsDto: CreateUserHasPermissionsDto,
  ) {
    return this.userHasPermissionsService.create(createUserHasPermissionsDto);
  }

  @Patch(':id')
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

  @Delete(':id')
  public async destroy(@Param('id') id: string) {
    const deleteds = await this.userHasPermissionsService.remove(+id);
    return {
      deleteds,
      message: 'Item deletado com sucesso',
    };
  }
}
