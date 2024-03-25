import { Body, Query, Param, Get, Patch, Post, Delete } from '@nestjs/common';
import { ZodValidationPipe, SwaggerSafeController } from 'core';
import { ResearchLineService } from './research-line.service';
import {
  CreateResearchLineDto,
  UpdateResearchLineDto,
  createResearchLineSchema,
  updateResearchLineSchema,
} from './dto';
import { Can } from '@app/permissions';

@SwaggerSafeController('research-line')
export class ResearchLineController {
  public constructor(
    private readonly researchLineService: ResearchLineService,
  ) {}

  @Get()
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

  @Get(':id')
  @Can('research-line.index')
  public findOne(@Param('id') id: string) {
    return this.researchLineService.findOne(+id);
  }

  @Post()
  @Can('research-line.create')
  public create(
    @Body(new ZodValidationPipe(createResearchLineSchema))
    createResearchLineDto: CreateResearchLineDto,
  ) {
    return this.researchLineService.create(createResearchLineDto);
  }

  @Patch(':id')
  @Can('research-line.update')
  public update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateResearchLineSchema))
    updateResearchLineDto: UpdateResearchLineDto,
  ) {
    return this.researchLineService.update(+id, updateResearchLineDto);
  }

  @Delete(':id')
  @Can('research-line.delete')
  public destroy(@Param('id') id: string) {
    return this.researchLineService.remove(+id);
  }
}
