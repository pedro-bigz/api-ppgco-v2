import {
  Body,
  Query,
  Param,
} from '@nestjs/common';
import {
  OrderDto,
  ZodValidationPipe,
  SwaggerSafeController,
  SwaggerSafeGet,
  SwaggerSafePost,
  SwaggerSafePatch,
  SwaggerSafeDelete,
} from 'src/core';
import { NotificationsService } from './notifications.service';
import {
  CreateNotificationsDto,
  UpdateNotificationsDto,
  createNotificationsSchema,
  updateNotificationsSchema,
} from './dto';
import { Notification } from './entities';

@SwaggerSafeController('notifications')
export class NotificationsController {
  public constructor(private readonly notificationsService: NotificationsService) {}

  @SwaggerSafeGet({ type: Notification })
  public findAll(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('search') search: string,
    @Query('searchIn') searchIn: string,
    @Query('orderBy') order: OrderDto[],
  ) {
    return this.notificationsService.find(+page, +perPage, search, searchIn, order);
  }

  @SwaggerSafeGet({ path: ':id', type: Notification })
  public findOne(@Param('id') id: string) {
    return this.notificationsService.findOne(+id);
  }

  @SwaggerSafePost({ type: Notification })
  public create(
    @Body(new ZodValidationPipe(createNotificationsSchema))
    createNotificationsDto: CreateNotificationsDto,
  ) {
    return this.notificationsService.create(createNotificationsDto);
  }

  @SwaggerSafePatch({ path: ':id' })
  public async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateNotificationsSchema))
    updateNotificationsDto: UpdateNotificationsDto,
  ) {
    const [updateds] = await this.notificationsService.update(+id, updateNotificationsDto);
    return {
      updateds,
      message: 'Item atualizado com sucesso',
    }
  }

  @SwaggerSafeDelete({ path: ':id' })
  public async destroy(@Param('id') id: string) {
    const deleteds = await this.notificationsService.remove(+id);
    return {
      deleteds,
      message: 'Item deletado com sucesso',
    }
  }
}
