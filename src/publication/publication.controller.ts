import { Body, Query, Param } from '@nestjs/common';
import {
  ZodValidationPipe,
  SwaggerSafeController,
  SwaggerSafeGet,
  SwaggerSafePost,
  SwaggerSafePatch,
  SwaggerSafeDelete,
} from '@app/core';
import {
  CreatePublicationDto,
  PaginatedPublicationDto,
  UpdatePublicationDto,
  createPublicationSchema,
  updatePublicationSchema,
} from './dto';
import { Can } from '@app/permissions';
import { PublicationService } from './publication.service';
import { Permissions } from './publication.enum';
import { Publication } from './entities';

@SwaggerSafeController('publication')
export class PublicationController {
  public constructor(private readonly publicationService: PublicationService) {}

  @SwaggerSafeGet({ type: PaginatedPublicationDto, isPaginated: true })
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

  @SwaggerSafeGet({ path: ':id', type: Publication })
  @Can(Permissions.Index)
  public findOne(@Param('id') id: string) {
    return this.publicationService.findOne(+id);
  }

  @SwaggerSafePost({ type: Publication })
  @Can(Permissions.Create)
  public create(
    @Body(new ZodValidationPipe(createPublicationSchema))
    createPublicationDto: CreatePublicationDto,
  ) {
    return this.publicationService.create(createPublicationDto);
  }

  @SwaggerSafePatch({ path: ':id' })
  @Can(Permissions.Update)
  public update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updatePublicationSchema))
    updatePublicationDto: UpdatePublicationDto,
  ) {
    return this.publicationService.update(+id, updatePublicationDto);
  }

  @SwaggerSafeDelete({ path: ':id' })
  @Can(Permissions.Delete)
  public destroy(@Param('id') id: string) {
    return this.publicationService.remove(+id);
  }
}
