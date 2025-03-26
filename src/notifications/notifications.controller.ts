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
import { OrderDto, ZodValidationPipe } from 'src/core';
import { NotificationsService } from './notifications.service';
import {
  CreateNotificationsDto,
  UpdateNotificationsDto,
  createNotificationsSchema,
  updateNotificationsSchema,
} from './dto';
import { Notification } from './entities';
import { ApiConflictResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('notifications')
export class NotificationsController {
  public constructor(
    private readonly notificationsService: NotificationsService,
  ) {}

  @Get()
  @ApiOkResponse({ type: Notification })
  public findAll(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('search') search: string,
    @Query('searchIn') searchIn: string,
    @Query('orderBy') order: OrderDto[],
  ) {
    return this.notificationsService.find(
      +page,
      +perPage,
      search,
      searchIn,
      order,
    );
  }

  @Get(':id')
  @ApiOkResponse({ type: Notification })
  public findOne(@Param('id') id: string) {
    return this.notificationsService.findOne(+id);
  }

  @Post()
  @ApiConflictResponse({ type: Notification })
  public create(
    @Body(new ZodValidationPipe(createNotificationsSchema))
    createNotificationsDto: CreateNotificationsDto,
  ) {
    return this.notificationsService.create(createNotificationsDto);
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateNotificationsSchema))
    updateNotificationsDto: UpdateNotificationsDto,
  ) {
    const [updateds] = await this.notificationsService.update(
      +id,
      updateNotificationsDto,
    );
    return {
      updateds,
      message: 'Item atualizado com sucesso',
    };
  }

  @Delete(':id')
  public async destroy(@Param('id') id: string) {
    const deleteds = await this.notificationsService.remove(+id);
    return {
      deleteds,
      message: 'Item deletado com sucesso',
    };
  }
}
