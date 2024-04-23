import { Body, Param, Query } from '@nestjs/common';
import {
  ZodValidationPipe,
  SwaggerSafeController,
  SwaggerSafeGet,
  SwaggerSafePost,
  SwaggerSafePatch,
  SwaggerSafeDelete,
} from '@app/core';
import { MilestoneService } from './milestone.service';
import {
  CreateMilestoneDto,
  PaginatedMilestoneDto,
  UpdateMilestoneDto,
  createMilestoneSchema,
  updateMilestoneSchema,
} from './dto';
import { Can } from '@app/permissions';
import { Permissions } from './milestone.enum';
import { Milestone } from './entities';

@SwaggerSafeController('milestone')
export class MilestoneController {
  public constructor(private readonly milestoneService: MilestoneService) {}

  @SwaggerSafeGet({ type: PaginatedMilestoneDto })
  @Can(Permissions.List)
  public findAll(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('search') search: string,
    @Query('searchIn') searchIn: string,
    @Query('order') order: Record<string, 'ASC' | 'DESC'>,
  ) {
    return this.milestoneService.find(+page, +perPage, search, searchIn, order);
  }

  @SwaggerSafeGet({ path: ':id', type: Milestone })
  @Can(Permissions.Index)
  public findOne(@Param('id') id: string) {
    return this.milestoneService.findOne(+id);
  }

  @SwaggerSafePost({ path: ':projectId/new', type: Milestone })
  @Can(Permissions.Create)
  public create(
    @Param('projectId') projectId: string,
    @Body(new ZodValidationPipe(createMilestoneSchema))
    createMilestoneDto: CreateMilestoneDto,
  ) {
    return this.milestoneService.create(+projectId, createMilestoneDto);
  }

  @SwaggerSafePatch({ path: ':id' })
  @Can(Permissions.Update)
  public update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateMilestoneSchema))
    updateMilestoneDto: UpdateMilestoneDto,
  ) {
    return this.milestoneService.update(+id, updateMilestoneDto);
  }

  @SwaggerSafeDelete({ path: ':id' })
  @Can(Permissions.Delete)
  public destroy(@Param('id') id: string) {
    return this.milestoneService.remove(+id);
  }
}
