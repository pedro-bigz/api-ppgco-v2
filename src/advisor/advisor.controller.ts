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
import { AdvisorService } from './advisor.service';
import {
  CreateAdvisorDto,
  UpdateAdvisorDto,
  createAdvisorSchema,
  updateAdvisorSchema,
} from './dto';
import { ZodValidationPipe } from 'core';

@Controller('advisor')
export class AdvisorController {
  public constructor(private readonly advisorService: AdvisorService) {}

  @Get()
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
  public findOne(@Param('id') id: string) {
    return this.advisorService.findOne(+id);
  }

  @Post()
  public create(
    @Body(new ZodValidationPipe(createAdvisorSchema))
    createAdvisorDto: CreateAdvisorDto,
  ) {
    return this.advisorService.create(createAdvisorDto);
  }

  @Patch(':id')
  public update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateAdvisorSchema))
    updateAdvisorDto: UpdateAdvisorDto,
  ) {
    return this.advisorService.update(+id, updateAdvisorDto);
  }

  @Delete(':id')
  public destroy(@Param('id') id: string) {
    return this.advisorService.remove(+id);
  }
}
