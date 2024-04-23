import { Body, Query, Param, Get, Patch, Post, Delete } from '@nestjs/common';
import {
  ZodValidationPipe,
  SwaggerSafeController,
  SwaggerSafeGet,
  SwaggerSafePost,
  SwaggerSafePatch,
  SwaggerSafeDelete,
} from '@app/core';
import { ResearchLineService } from './research-line.service';
import {
  CreateResearchLineDto,
  PaginatedResearchLineDto,
  UpdateResearchLineDto,
  createResearchLineSchema,
  updateResearchLineSchema,
} from './dto';
import { Can } from '@app/permissions';
import { ResearchLine } from './entities';

@SwaggerSafeController('research-line')
export class ResearchLineController {
  public constructor(
    private readonly researchLineService: ResearchLineService,
  ) {}

  @SwaggerSafeGet({ type: PaginatedResearchLineDto })
  @Can('research-line.list')
  public findAll(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('search') search: string,
    @Query('searchIn') searchIn: string,
    @Query('order') order: Record<string, 'ASC' | 'DESC'>,
  ) {
    return this.researchLineService.find(
      +page,
      +perPage,
      search,
      searchIn,
      order,
    );
  }

  @SwaggerSafeGet({ path: ':id', type: ResearchLine })
  @Can('research-line.index')
  public findOne(@Param('id') id: string) {
    return this.researchLineService.findOne(+id);
  }

  @SwaggerSafePost({ type: ResearchLine })
  @Can('research-line.create')
  public create(
    @Body(new ZodValidationPipe(createResearchLineSchema))
    createResearchLineDto: CreateResearchLineDto,
  ) {
    return this.researchLineService.create(createResearchLineDto);
  }

  @SwaggerSafePatch({ path: ':id' })
  @Can('research-line.update')
  public update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateResearchLineSchema))
    updateResearchLineDto: UpdateResearchLineDto,
  ) {
    return this.researchLineService.update(+id, updateResearchLineDto);
  }

  @SwaggerSafeDelete({ path: ':id' })
  @Can('research-line.delete')
  public destroy(@Param('id') id: string) {
    return this.researchLineService.remove(+id);
  }
}
