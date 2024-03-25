import { Body, Query, Param, Get, Patch, Post, Delete } from '@nestjs/common';
import { ZodValidationPipe, SwaggerSafeController } from 'core';
import { PublicationService } from './publication.service';
import {
  CreatePublicationDto,
  UpdatePublicationDto,
  createPublicationSchema,
  updatePublicationSchema,
} from './dto';
import { Can } from '@app/permissions';
import { Permissions } from './publication.enum';

@SwaggerSafeController('publication')
export class PublicationController {
  public constructor(private readonly publicationService: PublicationService) {}

  @Get()
  @Can(Permissions.List)
  public findAll(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('search') search: string,
    @Query('searchIn') searchIn: string,
    @Query('order') order: Record<string, 'ASC' | 'DESC'>,
  ) {
    return this.publicationService.find(
      +page,
      +perPage,
      search,
      searchIn,
      order,
    );
  }

  @Get(':id')
  @Can(Permissions.Index)
  public findOne(@Param('id') id: string) {
    return this.publicationService.findOne(+id);
  }

  @Post()
  @Can(Permissions.Create)
  public create(
    @Body(new ZodValidationPipe(createPublicationSchema))
    createPublicationDto: CreatePublicationDto,
  ) {
    return this.publicationService.create(createPublicationDto);
  }

  @Patch(':id')
  @Can(Permissions.Update)
  public update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updatePublicationSchema))
    updatePublicationDto: UpdatePublicationDto,
  ) {
    return this.publicationService.update(+id, updatePublicationDto);
  }

  @Delete(':id')
  @Can(Permissions.Delete)
  public destroy(@Param('id') id: string) {
    return this.publicationService.remove(+id);
  }
}
