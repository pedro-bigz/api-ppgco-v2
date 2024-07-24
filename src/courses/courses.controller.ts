import { Body, Query, Param } from '@nestjs/common';
import {
  ZodValidationPipe,
  SwaggerSafeController,
  SwaggerSafeGet,
  SwaggerSafePost,
  SwaggerSafePatch,
  SwaggerSafeDelete,
  OrderDto,
} from 'src/core';
import { Can } from 'src/permissions';
import { CoursesService } from './courses.service';
import {
  CreateCoursesDto,
  PaginatedCourseDto,
  UpdateCoursesDto,
  createCoursesSchema,
  updateCoursesSchema,
} from './dto';
import { Course } from './entities';
import { Permissions } from './courses.enum';

@SwaggerSafeController('courses')
export class CoursesController {
  public constructor(private readonly coursesService: CoursesService) {}

  @SwaggerSafeGet({ type: PaginatedCourseDto })
  @Can(Permissions.List)
  public findAll(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('search') search: string,
    @Query('searchIn') searchIn: string,
    @Query('orderBy') order: OrderDto[],
  ) {
    return this.coursesService.find(+page, +perPage, search, searchIn, order);
  }

  @SwaggerSafeGet({ path: ':id', type: Course })
  @Can(Permissions.Read)
  public findOne(@Param('id') id: string) {
    return this.coursesService.findOne(+id);
  }

  @SwaggerSafePost({ type: Course })
  @Can(Permissions.Create)
  public create(
    @Body(new ZodValidationPipe(createCoursesSchema))
    createCoursesDto: CreateCoursesDto,
  ) {
    return this.coursesService.create(createCoursesDto);
  }

  @SwaggerSafePatch({ path: ':id' })
  @Can(Permissions.Update)
  public async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateCoursesSchema))
    updateCoursesDto: UpdateCoursesDto,
  ) {
    const [updateds] = await this.coursesService.update(+id, updateCoursesDto);
    return {
      updateds,
      message: 'Item atualizado com sucesso',
    };
  }

  @SwaggerSafeDelete({ path: ':id' })
  @Can(Permissions.Delete)
  public destroy(@Param('id') id: string) {
    const deleteds = this.coursesService.remove(+id);
    return {
      deleteds,
      message: 'Item deletado com sucesso',
    };
  }
}
