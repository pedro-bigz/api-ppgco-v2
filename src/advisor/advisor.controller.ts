import { Body, Query, Param, Get, Patch, Post, Delete } from '@nestjs/common';
import { ZodValidationPipe, SwaggerSafeController } from 'core';
import { AdvisorService } from './advisor.service';
import {
  CreateAdvisorDto,
  UpdateAdvisorDto,
  createAdvisorSchema,
  updateAdvisorSchema,
} from './dto';
import { Can } from '@app/permissions';
import { Permissions } from './advisor.enum';

@SwaggerSafeController('advisor')
export class AdvisorController {
  public constructor(private readonly advisorService: AdvisorService) {}

  @Get()
  @Can(Permissions.List)
  public findAll(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('search') search: string,
    @Query('searchIn') searchIn: string,
    @Query('order') order: Record<string, 'ASC' | 'DESC'>,
  ) {
    return this.advisorService.find(+page, +perPage, search, searchIn, order);
  }

  @Get(':id')
  @Can(Permissions.Index)
  public findOne(@Param('id') id: string) {
    return this.advisorService.findOne(+id);
  }

  @Post()
  @Can(Permissions.Create)
  public create(
    @Body(new ZodValidationPipe(createAdvisorSchema))
    createAdvisorDto: CreateAdvisorDto,
  ) {
    return this.advisorService.create(createAdvisorDto);
  }

  @Patch(':id')
  @Can(Permissions.Update)
  public update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateAdvisorSchema))
    updateAdvisorDto: UpdateAdvisorDto,
  ) {
    return this.advisorService.update(+id, updateAdvisorDto);
  }

  @Delete(':id')
  @Can(Permissions.Delete)
  public destroy(@Param('id') id: string) {
    return this.advisorService.remove(+id);
  }
}
