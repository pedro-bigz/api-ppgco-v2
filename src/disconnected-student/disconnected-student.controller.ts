import { Body, Query, Param, Controller, Get, Post } from '@nestjs/common';
import { ZodValidationPipe, OrderDto } from 'src/core';
import { DisconnectedStudentService } from './disconnected-student.service';
import {
  CreateDisconnectedStudentDto,
  createDisconnectedStudentSchema,
  PaginatedDisconnectedStudentDto,
} from './dto';
import { Can } from 'src/permissions';
import { Permissions } from './disconnected-student.enum';
import { DisconnectedStudent } from './entities';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('disconnect-student')
export class DisconnectedStudentController {
  public constructor(
    private readonly disconnectedStudentService: DisconnectedStudentService,
  ) {}

  @Get()
  @Can(Permissions.List)
  @ApiOkResponse({ type: PaginatedDisconnectedStudentDto })
  public findAll(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('search') search: string,
    @Query('searchIn') searchIn: string,
    @Query('orderBy') order: OrderDto[],
  ) {
    return this.disconnectedStudentService.find(
      +page,
      +perPage,
      search,
      searchIn,
      order,
    );
  }

  @Get(':studentId')
  @ApiOkResponse({ type: DisconnectedStudent })
  @Can(Permissions.Read)
  public findOne(@Param('studentId') studentId: string) {
    return this.disconnectedStudentService.findOne(+studentId);
  }

  @Post(':studentId')
  @ApiCreatedResponse({ type: DisconnectedStudent })
  @Can(Permissions.Create)
  public disconnectStudent(
    @Param('studentId') studentId: string,
    @Body(new ZodValidationPipe(createDisconnectedStudentSchema))
    createDisconnectedStudentDto: CreateDisconnectedStudentDto,
  ) {
    return this.disconnectedStudentService.disconnectStudent(
      +studentId,
      createDisconnectedStudentDto,
    );
  }
}
