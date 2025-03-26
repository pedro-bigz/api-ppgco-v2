import {
  Body,
  Query,
  Param,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import {
  ZodValidationPipe,
  OrderDto,
  DeleteSuccessResponse,
  UpdateSuccessResponse,
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
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('courses')
export class CoursesController {
  public constructor(private readonly coursesService: CoursesService) {}

  @Get()
  @Can(Permissions.List)
  @ApiOkResponse({ type: PaginatedCourseDto })
  public findAll(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('search') search: string,
    @Query('searchIn') searchIn: string,
    @Query('orderBy') order: OrderDto[],
  ) {
    return this.coursesService.find(+page, +perPage, search, searchIn, order);
  }

  @Get(':id')
  @ApiOkResponse({ type: Course })
  @Can(Permissions.Read)
  public findOne(@Param('id') id: string) {
    return this.coursesService.findOne(+id);
  }

  @Post()
  @Can(Permissions.Create)
  @ApiCreatedResponse({ type: Course })
  public create(
    @Body(new ZodValidationPipe(createCoursesSchema))
    createCoursesDto: CreateCoursesDto,
  ) {
    return this.coursesService.create(createCoursesDto);
  }

  @Patch(':id')
  @Can(Permissions.Update)
  @ApiOkResponse({ type: UpdateSuccessResponse })
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

  @Delete(':id')
  @Can(Permissions.Delete)
  @ApiOkResponse({ type: DeleteSuccessResponse })
  public async destroy(@Param('id') id: string) {
    const deleteds = await this.coursesService.remove(+id);
    return {
      deleteds,
      message: 'Item deletado com sucesso',
    };
  }
}
