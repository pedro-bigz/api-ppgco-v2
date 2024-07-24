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
import { ResearchLineService } from './research-line.service';
import {
  CreateResearchLineDto,
  UpdateResearchLineDto,
  createResearchLineSchema,
  updateResearchLineSchema,
} from './dto';
import { Can } from 'src/permissions';
import { ResearchLine } from './entities';
import { PaginatedResearchLineDto } from './dto/paginated-research-line.dto';
import { Permissions } from './research-line.enum';

@SwaggerSafeController('research-lines')
export class ResearchLineController {
  public constructor(
    private readonly researchLineService: ResearchLineService,
  ) {}

  @SwaggerSafeGet({ type: PaginatedResearchLineDto })
  @Can(Permissions.List)
  public findAll(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('search') search: string,
    @Query('searchIn') searchIn: string,
    @Query('orderBy') order: OrderDto[],
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
  @Can(Permissions.Read)
  public findOne(@Param('id') id: string) {
    return this.researchLineService.findOne(+id);
  }

  @SwaggerSafePost({ type: ResearchLine })
  @Can(Permissions.Create)
  public create(
    @Body(new ZodValidationPipe(createResearchLineSchema))
    createResearchLineDto: CreateResearchLineDto,
  ) {
    return this.researchLineService.create(createResearchLineDto);
  }

  @SwaggerSafePatch({ path: ':id' })
  @Can(Permissions.Update)
  public update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateResearchLineSchema))
    updateResearchLineDto: UpdateResearchLineDto,
  ) {
    return this.researchLineService.update(+id, updateResearchLineDto);
  }

  @SwaggerSafeDelete({ path: ':id' })
  @Can(Permissions.Delete)
  public destroy(@Param('id') id: string) {
    return this.researchLineService.remove(+id);
  }
}
