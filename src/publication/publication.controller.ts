import {
  Body,
  Query,
  Param,
  Get,
  Patch,
  Post,
  Delete,
  Controller,
} from '@nestjs/common';
import { PublicationService } from './publication.service';
import {
  CreatePublicationDto,
  UpdatePublicationDto,
  createPublicationSchema,
  updatePublicationSchema,
} from './dto';
import { ZodValidationPipe } from 'core';

@Controller('publication')
export class PublicationController {
  public constructor(private readonly publicationService: PublicationService) {}

  @Get()
  public findAll(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('search') search: string,
    @Query('searchIn') searchIn: string,
    @Query('order') order: Record<string, 'ASC' | 'DESC'>,
  ) {
    return this.publicationService.find(+page, +perPage, search, searchIn, order);
  }

  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.publicationService.findOne(+id);
  }

  @Post()
  public create(
    @Body(new ZodValidationPipe(createPublicationSchema))
    createPublicationDto: CreatePublicationDto,
  ) {
    return this.publicationService.create(createPublicationDto);
  }

  @Patch(':id')
  public update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updatePublicationSchema))
    updatePublicationDto: UpdatePublicationDto,
  ) {
    return this.publicationService.update(+id, updatePublicationDto);
  }

  @Delete(':id')
  public destroy(@Param('id') id: string) {
    return this.publicationService.remove(+id);
  }
}
