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
import { DisconnectedStudentService } from './disconnected-student.service';
import {
  CreateDisconnectedStudentDto,
  createDisconnectedStudentSchema,
} from './dto';
import { ZodValidationPipe } from 'core';

@Controller('disconnect-student')
export class DisconnectedStudentController {
  public constructor(
    private readonly disconnectedStudentService: DisconnectedStudentService,
  ) {}

  @Get()
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
  public findOne(@Param('id') id: string) {
    return this.disconnectedStudentService.findOne(+id);
  }

  @Post(':studentId')
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
