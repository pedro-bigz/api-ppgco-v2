import { Body, Param, Query } from '@nestjs/common';
import {
  ZodValidationPipe,
  SwaggerSafeController,
  SwaggerSafeGet,
  SwaggerSafeDelete,
  SwaggerSafePatch,
  SwaggerSafePost,
  UpdateSuccessResponse,
} from '@app/core';
import { ProjectService } from './project.service';
import {
  CreateProjectDto,
  UpdateProjectDto,
  createProjectSchema,
  updateProjectSchema,
  PaginatedProjectDto,
} from './dto';
import { Can } from '@app/permissions';
import { Permissions } from './project.enum';
import { Project } from './entities';

@SwaggerSafeController('project')
export class ProjectController {
  public constructor(private readonly projectService: ProjectService) {}

  @SwaggerSafeGet({ type: Project, isPaginated: true })
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

  @SwaggerSafeGet({ path: ':id', type: Project })
  @Can(Permissions.Index)
  public findOne(@Param('id') id: string) {
    return this.projectService.findOne(+id);
  }

  @SwaggerSafePost({ type: Project })
  @Can(Permissions.Create)
  public create(
    @Body(new ZodValidationPipe(createProjectSchema))
    createProjectDto: CreateProjectDto,
  ) {
    return this.projectService.create(createProjectDto);
  }

  @SwaggerSafePatch({ path: ':id' })
  @Can(Permissions.Update)
  public update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateProjectSchema))
    updateProjectDto: UpdateProjectDto,
  ) {
    const updateds = this.projectService.update(+id, updateProjectDto);
    return {
      status: 'success',
      message: 'Project updated successfully',
      updateds,
    };
  }

  @SwaggerSafeDelete({ path: ':id' })
  @Can(Permissions.Delete)
  public destroy(@Param('id') id: string) {
    const deleteds = this.projectService.remove(+id);
    return {
      status: 'success',
      message: 'Project deleted successfully',
      deleteds,
    };
  }
}
