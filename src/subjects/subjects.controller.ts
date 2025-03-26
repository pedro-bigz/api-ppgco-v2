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
  Filters,
  DeleteSuccessResponse,
  UpdateSuccessResponse,
} from 'src/core';
import { SubjectsService } from './subjects.service';
import {
  CreateSubjectsByListDto,
  CreateSubjectsDto,
  UpdateSubjectsDto,
  createSubjectsSchema,
  createSubjectsSchemaByList,
  updateSubjectsSchema,
} from './dto';
import { Subject } from './entities';
import { PaginatedSubjectDto } from './dto/paginated-subject.dto';
import { Can } from 'src/permissions';
import { Permissions } from './subjects.enum';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('subjects')
export class SubjectsController {
  public constructor(private readonly subjectsService: SubjectsService) {}

  @Get()
  @ApiOkResponse({ type: PaginatedSubjectDto })
  @Can(Permissions.List)
  public findAll(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('search') search: string,
    @Query('searchIn') searchIn: string,
    @Query('orderBy') orderBy: OrderDto[],
    @Query('filters') filters: Filters,
  ) {
    return this.subjectsService.find(
      +page,
      +perPage,
      search,
      searchIn,
      orderBy,
      filters,
    );
  }

  // @SwaggerSafeGet({ path: '/count', type: Number })
  // @Can(Permissions.List)
  // public count(
  //   @Query('search') search: string,
  //   @Query('searchIn') searchIn: string,
  //   @Query('groupBy') groupBy: string,
  // ) {
  //   return this.subjectsService.count(search, searchIn);
  // }

  @Get(':id')
  @ApiOkResponse({ type: Subject })
  @Can(Permissions.Read)
  public findOne(@Param('id') id: string) {
    return this.subjectsService.findOne(+id);
  }

  @Post()
  @ApiCreatedResponse({ type: Subject })
  @Can(Permissions.Create)
  public create(
    @Body(new ZodValidationPipe(createSubjectsSchema))
    createSubjectsDto: CreateSubjectsDto,
  ) {
    return this.subjectsService.create(createSubjectsDto);
  }

  @Post('by-list')
  @ApiCreatedResponse({ type: Subject })
  @Can(Permissions.Create)
  public createByList(
    @Body(new ZodValidationPipe(createSubjectsSchemaByList))
    createSubjectsByListDto: CreateSubjectsByListDto,
  ) {
    return Promise.all(
      createSubjectsByListDto.map((createSubjectsDto: CreateSubjectsDto) =>
        this.subjectsService.create(createSubjectsDto),
      ),
    );
  }

  @Patch(':id')
  @Can(Permissions.Update)
  @ApiOkResponse({ type: UpdateSuccessResponse })
  public async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateSubjectsSchema))
    updateSubjectsDto: UpdateSubjectsDto,
  ) {
    const [updateds] = await this.subjectsService.update(
      +id,
      updateSubjectsDto,
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
    const deleteds = await this.subjectsService.remove(+id);
    return {
      deleteds,
      message: 'Item deletado com sucesso',
    };
  }
}
