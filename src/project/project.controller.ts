import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ZodValidationPipe,
  OrderDto,
  Filters,
  DeleteSuccessResponse,
  UpdateSuccessResponse,
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
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('projects')
export class ProjectController {
  public constructor(
    private readonly projectService: ProjectService,
    private readonly projectHasCoadvisorService: ProjectHasCoadvisorService,
  ) {}

  @Get()
  @Can(Permissions.List)
  @ApiOkResponse({ type: PaginatedProjectDto })
  public findAll(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('search') search: string,
    @Query('searchIn') searchIn: string,
    @Query('orderBy') order: OrderDto[],
    @Query('filters') filters: Filters,
  ) {
    return this.projectService.find(
      +page,
      +perPage,
      search,
      searchIn,
      order,
      filters,
    );
  }

  @Get(':id')
  @ApiOkResponse({ type: Project })
  @Can(Permissions.Read)
  public findOne(@Param('id') id: string) {
    return this.projectService.findOne(+id);
  }

  @Get(':id/coadvisors')
  @Can(Permissions.Read)
  @ApiOkResponse({ type: Project })
  public async findCoadvisors(@Param('id') id: string) {
    return this.projectHasCoadvisorService
      .findFrom(+id)
      .then((projectHasCoadvisors) =>
        projectHasCoadvisors.map((projectHasCoadvisor) => {
          return projectHasCoadvisor?.dataValues?.advisor;
        }),
      );
  }

  @Post()
  @ApiCreatedResponse({ type: Project })
  @Can(Permissions.Create)
  public create(
    @Body(new ZodValidationPipe(createProjectSchema))
    createProjectDto: CreateProjectDto,
  ) {
    return this.projectService.create(createProjectDto);
  }

  @Patch(':id')
  @Can(Permissions.Update)
  @ApiOkResponse({ type: UpdateSuccessResponse })
  public async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateProjectSchema))
    updateProjectDto: UpdateProjectDto,
  ) {
    const [updateds] = await this.projectService.update(+id, updateProjectDto);
    return {
      message: 'Project updated successfully',
      updateds,
    };
  }

  @Delete(':id')
  @Can(Permissions.Delete)
  @ApiOkResponse({ type: DeleteSuccessResponse })
  public destroy(@Param('id') id: string) {
    const deleteds = this.projectService.remove(+id);
    return {
      message: 'Project deleted successfully',
      deleteds,
    };
  }
}
