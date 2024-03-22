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
import { MilestoneService } from './milestone.service';
import {
  CreateMilestoneDto,
  UpdateMilestoneDto,
  createMilestoneSchema,
  updateMilestoneSchema,
} from './dto';
import { ZodValidationPipe } from 'core';

@Controller('milestone')
export class MilestoneController {
  public constructor(private readonly milestoneService: MilestoneService) {}

  @Get()
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
  public findOne(@Param('id') id: string) {
    return this.milestoneService.findOne(+id);
  }

  @Post(':projectId/new')
  public create(
    @Param('projectId') projectId: string,
    @Body(new ZodValidationPipe(createMilestoneSchema))
    createMilestoneDto: CreateMilestoneDto,
  ) {
    return this.milestoneService.create(+projectId, createMilestoneDto);
  }

  @Patch(':id')
  public update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateMilestoneSchema))
    updateMilestoneDto: UpdateMilestoneDto,
  ) {
    return this.milestoneService.update(+id, updateMilestoneDto);
  }

  @Delete('/:id')
  public destroy(@Param('id') id: string) {
    return this.milestoneService.remove(+id);
  }
}
