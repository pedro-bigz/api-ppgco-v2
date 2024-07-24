import { Body, Query, Param } from '@nestjs/common';
import {
  ZodValidationPipe,
  SwaggerSafeController,
  SwaggerSafeGet,
  SwaggerSafePost,
  SwaggerSafePatch,
  SwaggerSafeDelete,
  OrderDto,
} from 'src/core';
import { DocumentsService } from './documents.service';
import {
  CreateDocumentsDto,
  UpdateDocumentsDto,
  createDocumentsSchema,
  updateDocumentsSchema,
} from './dto';
import { Document } from './entities';

@SwaggerSafeController('documents')
export class DocumentsController {
  public constructor(private readonly documentsService: DocumentsService) {}

  @SwaggerSafeGet({ type: Document })
  public findAll(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('search') search: string,
    @Query('searchIn') searchIn: string,
    @Query('orderBy') order: OrderDto[],
  ) {
    return this.documentsService.find(+page, +perPage, search, searchIn, order);
  }

  @SwaggerSafePost({ type: Document })
  public create(
    @Body(new ZodValidationPipe(createDocumentsSchema))
    createDocumentsDto: CreateDocumentsDto,
  ) {
    return this.documentsService.create(createDocumentsDto);
  }

  @SwaggerSafeDelete({ path: ':name' })
  public async destroy(@Param('name') name: string) {
    const deleteds = await this.documentsService.remove(name);
    return {
      deleteds,
      message: 'Item deletado com sucesso',
    };
  }
}
