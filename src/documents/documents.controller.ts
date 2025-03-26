import {
  Body,
  Query,
  Param,
  Controller,
  Get,
  Post,
  Delete,
} from '@nestjs/common';
import { ZodValidationPipe, OrderDto } from 'src/core';
import { DocumentsService } from './documents.service';
import { CreateDocumentsDto, createDocumentsSchema } from './dto';
import { Document } from './entities';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('documents')
export class DocumentsController {
  public constructor(private readonly documentsService: DocumentsService) {}

  @Get()
  @ApiOkResponse({ type: Document })
  public findAll(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('search') search: string,
    @Query('searchIn') searchIn: string,
    @Query('orderBy') order: OrderDto[],
  ) {
    return this.documentsService.find(+page, +perPage, search, searchIn, order);
  }

  @Post()
  @ApiCreatedResponse({ type: Document })
  public create(
    @Body(new ZodValidationPipe(createDocumentsSchema))
    createDocumentsDto: CreateDocumentsDto,
  ) {
    return this.documentsService.create(createDocumentsDto);
  }

  @Delete(':name')
  public async destroy(@Param('name') name: string) {
    const deleteds = await this.documentsService.remove(name);
    return {
      deleteds,
      message: 'Item deletado com sucesso',
    };
  }
}
