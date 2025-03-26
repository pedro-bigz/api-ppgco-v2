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
import { ResearchLineService } from './research-line.service';
import {
  CreateResearchLineDto,
  UpdateResearchLineDto,
  createResearchLineSchema,
  updateResearchLineSchema,
} from './dto';
import { Can } from 'src/permissions';
import { ResearchLine } from './entities';
import { PaginatedResearchLineDto } from './dto/paginated-research-line.dto';
import { Permissions } from './research-line.enum';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('research-lines')
export class ResearchLineController {
  public constructor(
    private readonly researchLineService: ResearchLineService,
  ) {}

  @Get()
  @Can(Permissions.List)
  @ApiOkResponse({ type: PaginatedResearchLineDto })
  public findAll(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('search') search: string,
    @Query('searchIn') searchIn: string,
    @Query('orderBy') order: OrderDto[],
    @Query('filters') filters: Filters,
  ) {
    return this.researchLineService.find(
      +page,
      +perPage,
      search,
      searchIn,
      order,
      filters,
    );
  }

  @Get(':id')
  @Can(Permissions.Read)
  @ApiOkResponse({ type: ResearchLine })
  public findOne(@Param('id') id: string) {
    return this.researchLineService.findOne(+id);
  }

  @Post()
  @ApiCreatedResponse({ type: ResearchLine })
  @Can(Permissions.Create)
  public create(
    @Body(new ZodValidationPipe(createResearchLineSchema))
    createResearchLineDto: CreateResearchLineDto,
  ) {
    return this.researchLineService.create(createResearchLineDto);
  }

  @Patch(':id')
  @Can(Permissions.Update)
  @ApiOkResponse({ type: UpdateSuccessResponse })
  public async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateResearchLineSchema))
    updateResearchLineDto: UpdateResearchLineDto,
  ) {
    const [updateds] = await this.researchLineService.update(
      +id,
      updateResearchLineDto,
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
    const deleteds = await this.researchLineService.remove(+id);
    return {
      message: 'Student deleted successfully',
      deleteds,
    };
  }
}
