import { Body, Query, Param, Get, Post } from '@nestjs/common';
import { ZodValidationPipe, SwaggerSafeController } from 'core';
import { DisconnectedStudentService } from './disconnected-student.service';
import {
  CreateDisconnectedStudentDto,
  createDisconnectedStudentSchema,
} from './dto';
import { Can } from '@app/permissions';
import { Permissions } from './disconnected-student.enum';

@SwaggerSafeController('disconnect-student')
export class DisconnectedStudentController {
  public constructor(
    private readonly disconnectedStudentService: DisconnectedStudentService,
  ) {}

  @Get()
  @Can(Permissions.List)
  public findAll(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('search') search: string,
    @Query('searchIn') searchIn: string,
    @Query('order') order: Record<string, 'ASC' | 'DESC'>,
  ) {
    return this.disconnectedStudentService.find(
      +page,
      +perPage,
      search,
      searchIn,
      order,
    );
  }

  @Get(':id')
  @Can(Permissions.Index)
  public findOne(@Param('id') id: string) {
    return this.disconnectedStudentService.findOne(+id);
  }

  @Post(':studentId')
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
