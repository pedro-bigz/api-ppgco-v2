import {
  Body,
  Query,
  Param,
  Get,
  Patch,
  Post,
  Delete,
  Controller,
} from '@nestjs/common';
import { ResearchLineService } from './research-line.service';
import {
  CreateResearchLineDto,
  UpdateResearchLineDto,
  createResearchLineSchema,
  updateResearchLineSchema,
} from './dto';
import { ZodValidationPipe } from 'core';

@Controller('research-line')
export class ResearchLineController {
  public constructor(private readonly researchLineService: ResearchLineService) {}

  @Get()
  public findAll(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('search') search: string,
    @Query('searchIn') searchIn: string,
    @Query('order') order: Record<string, 'ASC' | 'DESC'>,
  ) {
    return this.researchLineService.find(+page, +perPage, search, searchIn, order);
  }

  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.researchLineService.findOne(+id);
  }

  @Post()
  public create(
    @Body(new ZodValidationPipe(createResearchLineSchema))
    createResearchLineDto: CreateResearchLineDto,
  ) {
    return this.researchLineService.create(createResearchLineDto);
  }

  @Patch(':id')
  public update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateResearchLineSchema))
    updateResearchLineDto: UpdateResearchLineDto,
  ) {
    return this.researchLineService.update(+id, updateResearchLineDto);
  }

  @Delete(':id')
  public destroy(@Param('id') id: string) {
    return this.researchLineService.remove(+id);
  }
}
