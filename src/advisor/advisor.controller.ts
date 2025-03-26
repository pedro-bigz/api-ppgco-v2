import {
  Body,
  Query,
  Param,
  Controller,
  Get,
  Delete,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ZodValidationPipe,
  OrderDto,
  Filters,
  UpdateSuccessResponse,
  DeleteSuccessResponse,
} from 'src/core';
import { AdvisorService } from './advisor.service';
import {
  CreateAdvisorDto,
  PaginatedAdvisorDto,
  UpdateAdvisorDto,
  createAdvisorSchema,
  updateAdvisorSchema,
} from './dto';
import { Can } from 'src/permissions';
import { Permissions } from './advisor.enum';
import { Advisor } from './entities';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('advisors')
export class AdvisorController {
  public constructor(private readonly advisorService: AdvisorService) {}

  @Get()
  @Can(Permissions.List)
  @ApiOkResponse({ type: PaginatedAdvisorDto })
  public async findAll(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('search') search: string,
    @Query('searchIn') searchIn: string,
    @Query('orderBy') order: OrderDto[],
    @Query('filters') filters: Filters,
  ) {
    return this.advisorService.find(
      +page,
      +perPage,
      search,
      searchIn,
      order,
      filters,
    );
  }

  @Get('/count')
  @Can(Permissions.List)
  @ApiOkResponse({ type: Number })
  public count(
    @Query('search') search: string,
    @Query('searchIn') searchIn: string,
    @Query('groupBy') groupBy: string,
    @Query('attributes') attributes: string | string[],
  ) {
    if (!groupBy) {
      return this.advisorService.count(search, searchIn, attributes);
    }

    return this.advisorService.groupedCount(
      search,
      searchIn,
      groupBy,
      attributes,
    );
  }

  @Get('/count-students-by-advisor')
  @Can(Permissions.List)
  @ApiOkResponse({ type: Number })
  public countStudentsByAdvisor() {
    return this.advisorService.countStudentsByAdvisor();
  }

  @Get(':id')
  @Can(Permissions.Read)
  @ApiOkResponse({ type: Advisor })
  public findOne(@Param('id') id: string) {
    return this.advisorService.findOne(+id);
  }

  @Post()
  @ApiCreatedResponse({ type: Advisor })
  @Can(Permissions.Create)
  public create(
    @Body(new ZodValidationPipe(createAdvisorSchema))
    createAdvisorDto: CreateAdvisorDto,
  ) {
    return this.advisorService.create(createAdvisorDto);
  }

  @Patch(':id')
  @Can(Permissions.Update)
  @ApiOkResponse({ type: UpdateSuccessResponse })
  public async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateAdvisorSchema))
    updateAdvisorDto: UpdateAdvisorDto,
  ) {
    const [updateds] = await this.advisorService.update(+id, updateAdvisorDto);
    return {
      updateds,
      message: 'Item atualizado com sucesso',
    };
  }

  @Delete(':id')
  @Can(Permissions.Delete)
  @ApiOkResponse({ type: DeleteSuccessResponse })
  public async destroy(@Param('id') id: string) {
    const deleteds = await this.advisorService.remove(+id);
    return {
      deleteds,
      message: 'Item deletado com sucesso',
    };
  }
}
