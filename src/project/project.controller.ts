import { Body, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ZodValidationPipe, SwaggerSafeController } from 'core';
import { ProjectService } from './project.service';
import {
  CreateProjectDto,
  UpdateProjectDto,
  createProjectSchema,
  updateProjectSchema,
} from './dto';
import { Can } from '@app/permissions';
import { Permissions } from './project.enum';

@SwaggerSafeController('project')
export class ProjectController {
  public constructor(private readonly projectService: ProjectService) {}

  @Get()
  @Can(Permissions.List)
  public findAll(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('search') search: string,
    @Query('searchIn') searchIn: string,
    @Query('order') order: Record<string, 'ASC' | 'DESC'>,
  ) {
    return this.projectService.find(+page, +perPage, search, searchIn, order);
  }

  @Get(':id')
  @Can(Permissions.Index)
  public findOne(@Param('id') id: string) {
    return this.projectService.findOne(+id);
  }

  @Post()
  @Can(Permissions.Create)
  public create(
    @Body(new ZodValidationPipe(createProjectSchema))
    createProjectDto: CreateProjectDto,
  ) {
    return this.projectService.create(createProjectDto);
  }

  @Patch(':id')
  @Can(Permissions.Update)
  public update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateProjectSchema))
    updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  @Can(Permissions.Delete)
  public destroy(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }
}
