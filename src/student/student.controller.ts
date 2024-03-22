import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { StudentService } from './student.service';
import {
  CreateStudentDto,
  UpdateStudentDto,
  createStudentSchema,
  updateStudentSchema,
} from './dto';
import { ZodValidationPipe } from 'core';

@Controller('student')
export class StudentController {
  public constructor(private readonly studentService: StudentService) {}

  @Get()
  public findAll(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('search') search: string,
    @Query('searchIn') searchIn: string,
    @Query('order') order: Record<string, 'ASC' | 'DESC'>,
  ) {
    return this.studentService.find(+page, +perPage, search, searchIn, order);
  }

  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.studentService.findOne(+id);
  }

  @Post()
  public create(
    @Body(new ZodValidationPipe(createStudentSchema))
    createStudentDto: CreateStudentDto,
  ) {
    return this.studentService.create(createStudentDto);
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateStudentSchema))
    updateStudentDto: UpdateStudentDto,
  ) {
    const [[userUpdateResult], [studentUpdateResult]] =
      await this.studentService.update(+id, updateStudentDto);

    if (!userUpdateResult || !studentUpdateResult) {
      throw new InternalServerErrorException(
        'Student record could not be updated',
      );
    }

    return {
      message: 'Updated successfully',
    };
  }

  @Delete('/:id')
  public destroy(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
}
