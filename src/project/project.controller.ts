import { Body, Param, Query } from '@nestjs/common';
import {
  ZodValidationPipe,
  SwaggerSafeController,
  SwaggerSafeGet,
  SwaggerSafeDelete,
  SwaggerSafePatch,
  SwaggerSafePost,
  OrderDto,
} from 'src/core';
import { ProjectService } from './project.service';
import {
  CreateProjectDto,
  PaginatedProjectDto,
  UpdateProjectDto,
  createProjectSchema,
  updateProjectSchema,
} from './dto';
import { Can } from 'src/permissions';
import { Permissions } from './project.enum';
import { Project } from './entities';
import { ProjectHasCoadvisorService } from 'src/project-has-coadvisor';

@SwaggerSafeController('projects')
export class ProjectController {
  public constructor(
    private readonly projectService: ProjectService,
    private readonly projectHasCoadvisorService: ProjectHasCoadvisorService,
  ) {}

  @SwaggerSafeGet({ type: PaginatedProjectDto })
  @Can(Permissions.List)
  public findAll(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('search') search: string,
    @Query('searchIn') searchIn: string,
    @Query('orderBy') order: OrderDto[],
  ) {
    return this.projectService.find(+page, +perPage, search, searchIn, order);
  }

  @SwaggerSafeGet({ path: ':id', type: Project })
  @Can(Permissions.Read)
  public findOne(@Param('id') id: string) {
    return this.projectService.findOne(+id);
  }

  @SwaggerSafeGet({ path: ':id/coadvisors', type: Project })
  @Can(Permissions.Read)
  public async findCoadvisors(@Param('id') id: string) {
    return this.projectHasCoadvisorService
      .findFrom(+id)
      .then((projectHasCoadvisors) =>
        projectHasCoadvisors.map((projectHasCoadvisor) => {
          return projectHasCoadvisor?.dataValues?.advisor;
        }),
      );
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
