import { Body, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ZodValidationPipe, SwaggerSafeController } from 'core';
import { MilestoneService } from './milestone.service';
import {
  CreateMilestoneDto,
  UpdateMilestoneDto,
  createMilestoneSchema,
  updateMilestoneSchema,
} from './dto';
import { Can } from '@app/permissions';
import { Permissions } from './milestone.enum';

@SwaggerSafeController('milestone')
export class MilestoneController {
  public constructor(private readonly milestoneService: MilestoneService) {}

  @Get()
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

  @Get(':id')
  @Can(Permissions.Index)
  public findOne(@Param('id') id: string) {
    return this.milestoneService.findOne(+id);
  }

  @Post(':projectId/new')
  @Can(Permissions.Create)
  public create(
    @Param('projectId') projectId: string,
    @Body(new ZodValidationPipe(createMilestoneSchema))
    createMilestoneDto: CreateMilestoneDto,
  ) {
    return this.milestoneService.create(+projectId, createMilestoneDto);
  }

  @Patch(':id')
  @Can(Permissions.Update)
  public update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateMilestoneSchema))
    updateMilestoneDto: UpdateMilestoneDto,
  ) {
    return this.milestoneService.update(+id, updateMilestoneDto);
  }

  @Delete('/:id')
  @Can(Permissions.Delete)
  public destroy(@Param('id') id: string) {
    return this.milestoneService.remove(+id);
  }
}
