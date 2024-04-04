import { Body, Query, Param } from '@nestjs/common';
import {
  ZodValidationPipe,
  SwaggerSafeController,
  SwaggerSafeGet,
  SwaggerSafePatch,
  SwaggerSafeDelete,
  SwaggerSafePost,
} from 'core';
import { AdvisorService } from './advisor.service';
import {
  CreateAdvisorDto,
  PaginatedAdvisorDto,
  UpdateAdvisorDto,
  createAdvisorSchema,
  updateAdvisorSchema,
} from './dto';
import { Can } from '@app/permissions';
import { Permissions } from './advisor.enum';
import { Advisor } from './entities';

@SwaggerSafeController('advisor')
export class AdvisorController {
  public constructor(private readonly advisorService: AdvisorService) {}

  @SwaggerSafeGet({ type: PaginatedAdvisorDto })
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

  @SwaggerSafeGet({ path: ':id', type: Advisor })
  @Can(Permissions.Index)
  public findOne(@Param('id') id: string) {
    return this.advisorService.findOne(+id);
  }

  @SwaggerSafePost({ type: Advisor })
  @Can(Permissions.Create)
  public create(
    @Body(new ZodValidationPipe(createAdvisorSchema))
    createAdvisorDto: CreateAdvisorDto,
  ) {
    return this.advisorService.create(createAdvisorDto);
  }

  @SwaggerSafePatch({ path: ':id' })
  @Can(Permissions.Update)
  public update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateAdvisorSchema))
    updateAdvisorDto: UpdateAdvisorDto,
  ) {
    return this.advisorService.update(+id, updateAdvisorDto);
  }

  @SwaggerSafeDelete({ path: ':id' })
  @Can(Permissions.Delete)
  public destroy(@Param('id') id: string) {
    return this.advisorService.remove(+id);
  }
}
