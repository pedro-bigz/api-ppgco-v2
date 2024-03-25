import {
  Body,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ZodValidationPipe, SwaggerSafeController } from 'core';
import { StudentService } from './student.service';
import {
  CreateStudentDto,
  UpdateStudentDto,
  createStudentSchema,
  updateStudentSchema,
} from './dto';
import { RequestUser, User } from '@app/user';
import { Can } from '@app/permissions';

@SwaggerSafeController('student')
export class StudentController {
  public constructor(private readonly studentService: StudentService) {}

  @Get()
  @Can('student.list')
  public findAll(
    @RequestUser() user: User,
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('search') search: string,
    @Query('searchIn') searchIn: string,
    @Query('order') order: Record<string, 'ASC' | 'DESC'>,
  ) {
    console.log({ user });
    return this.studentService.find(+page, +perPage, search, searchIn, order);
  }

  @Get(':id')
  @Can('student.index')
  public findOne(@Param('id') id: string) {
    return this.studentService.findOne(+id);
  }

  @Post()
  @Can('student.create')
  public create(
    @Body(new ZodValidationPipe(createStudentSchema))
    createStudentDto: CreateStudentDto,
  ) {
    return this.studentService.create(createStudentDto);
  }

  @Patch(':id')
  @Can('student.update')
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
  @Can('student.delete')
  public destroy(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
}
