import { Body, Param, Query } from '@nestjs/common';
import {
  ZodValidationPipe,
  SwaggerSafeController,
  SwaggerSafeGet,
  SwaggerSafePost,
  SwaggerSafePatch,
  SwaggerSafeDelete,
  OrderDto,
} from 'src/core';
import { MilestoneService } from './milestone.service';
import {
  CreateMilestoneDto,
  PaginatedMilestoneDto,
  UpdateMilestoneDto,
  createMilestoneSchema,
  updateMilestoneSchema,
  CreateMilestoneIntoProjectDto,
} from './dto';
import { Can } from 'src/permissions';
import { Permissions } from './milestone.enum';
import { Milestone } from './entities';
import { createMilestoneIntoProjectSchema } from './dto/create-milestone-into-project.dto';

@SwaggerSafeController('milestones')
export class MilestoneController {
  public constructor(private readonly milestoneService: MilestoneService) {}

  @SwaggerSafeGet({ type: PaginatedMilestoneDto })
  @Can(Permissions.List)
  public findAll(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('search') search: string,
    @Query('searchIn') searchIn: string,
    @Query('orderBy') order: OrderDto[],
  ) {
    return this.milestoneService.find(+page, +perPage, search, searchIn, order);
  }

  @SwaggerSafeGet({ path: ':id', type: Milestone })
  @Can(Permissions.Read)
  public findOne(@Param('id') id: string) {
    return this.milestoneService.findOne(+id);
  }

  @SwaggerSafePost({ type: Milestone })
  @Can(Permissions.Create)
  public create(
    @Body(new ZodValidationPipe(createMilestoneSchema))
    { project_ids, ...createMilestoneDto }: CreateMilestoneDto,
  ) {
    return this.milestoneService.createFromProjectList(
      project_ids,
      createMilestoneDto,
    );
  }

  @SwaggerSafePost({ path: ':projectId/new', type: Milestone })
  @Can(Permissions.Create)
  public createIntoProject(
    @Param('projectId') projectId: string,
    @Body(new ZodValidationPipe(createMilestoneIntoProjectSchema))
    createMilestoneDto: CreateMilestoneIntoProjectDto,
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
