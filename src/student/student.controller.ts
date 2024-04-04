import {
  Body,
  InternalServerErrorException,
  Param,
  Query,
} from '@nestjs/common';
import {
  ZodValidationPipe,
  SwaggerSafeController,
  SwaggerSafeGet,
  PaginatedResponse,
  SwaggerSafePost,
  SwaggerSafePatch,
  UpdateSuccessResponse,
  SwaggerSafeDelete,
  DeleteSuccessResponse,
} from 'core';
import { RequestUser, User } from '@app/user';
import { Can } from '@app/permissions';
import { StudentService } from './student.service';
import {
  CreateStudentDto,
  PaginatedStudentDto,
  UpdateStudentDto,
  createStudentSchema,
  updateStudentSchema,
} from './dto';
import { Student } from './entities';

@SwaggerSafeController('student')
export class StudentController {
  public constructor(private readonly studentService: StudentService) {}

  @SwaggerSafeGet({ type: PaginatedStudentDto, isPaginated: true })
  @Can('student.list')
  public findAll(
    @RequestUser() user: User,
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('search') search: string,
    @Query('searchIn') searchIn: string,
    @Query('order') order: Record<string, 'ASC' | 'DESC'>,
  ) {
    return this.studentService.find(+page, +perPage, search, searchIn, order);
  }

  @SwaggerSafeGet({ path: ':id', type: Student })
  @Can('student.index')
  public findOne(@Param('id') id: string) {
    return this.studentService.findOne(+id);
  }

  @SwaggerSafePost({ type: Student })
  @Can('student.create')
  public create(
    @Body(new ZodValidationPipe(createStudentSchema))
    createStudentDto: CreateStudentDto,
  ) {
    return this.studentService.create(createStudentDto);
  }

  @SwaggerSafePatch({ path: ':id', type: UpdateSuccessResponse })
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
      status: 'success',
      updateds: +(userUpdateResult && studentUpdateResult),
      message: 'Student updated successfully',
    };
  }

  @SwaggerSafeDelete({ path: '/:id', type: DeleteSuccessResponse })
  @Can('student.delete')
  public destroy(@Param('id') id: string) {
    const deleteds = this.studentService.remove(+id);
    return {
      status: 'success',
      message: 'Student deleted successfully',
      deleteds,
    };
  }
}
