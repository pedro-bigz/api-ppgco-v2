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
  DeleteSuccessResponse,
  UpdateSuccessResponse,
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
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('milestones')
export class MilestoneController {
  public constructor(private readonly milestoneService: MilestoneService) {}

  @Get()
  @Can(Permissions.List)
  @ApiOkResponse({ type: PaginatedMilestoneDto })
  public async findAll(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('search') search: string,
    @Query('searchIn') searchIn: string,
    @Query('orderBy') order: OrderDto[],
  ) {
    console.log(
      await this.milestoneService.find(
        +page,
        +perPage,
        search,
        searchIn,
        order,
      ),
    );
    return this.milestoneService.find(+page, +perPage, search, searchIn, order);
  }

  @Get(':id')
  @Can(Permissions.Read)
  @ApiOkResponse({ type: Milestone })
  public findOne(@Param('id') id: string) {
    return this.milestoneService.findOne(+id);
  }

  @Post()
  @Can(Permissions.Create)
  @ApiCreatedResponse({ type: Milestone })
  public create(
    @Body(new ZodValidationPipe(createMilestoneSchema))
    { project_ids, ...createMilestoneDto }: CreateMilestoneDto,
  ) {
    return this.milestoneService.createFromProjectList(
      project_ids,
      createMilestoneDto,
    );
  }

  @Post(':projectId/new')
  @Can(Permissions.Create)
  @ApiCreatedResponse({ type: Milestone })
  public createIntoProject(
    @Param('projectId') projectId: string,
    @Body(new ZodValidationPipe(createMilestoneIntoProjectSchema))
    createMilestoneDto: CreateMilestoneIntoProjectDto,
  ) {
    return this.milestoneService.create(+projectId, createMilestoneDto);
  }

  @Patch(':id')
  @Can(Permissions.Update)
  @ApiOkResponse({ type: UpdateSuccessResponse })
  public async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateMilestoneSchema))
    updateMilestoneDto: UpdateMilestoneDto,
  ) {
    const [updateds] = await this.milestoneService.update(
      +id,
      updateMilestoneDto,
    );
    return {
      updateds,
      message: 'Item atualizado com sucesso',
    };
  }

  @Delete(':id')
  @Can(Permissions.Delete)
  @ApiOkResponse({ type: DeleteSuccessResponse })
  public async destroy(@Param('id') id: string) {
    const deleteds = await this.milestoneService.remove(+id);
    return {
      deleteds,
      message: 'Item deletado com sucesso',
    };
  }
}
