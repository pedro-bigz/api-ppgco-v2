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
  SwaggerSafePost,
  SwaggerSafePatch,
  UpdateSuccessResponse,
  SwaggerSafeDelete,
  DeleteSuccessResponse,
  OrderDto,
} from 'src/core';
import { RequestUser, User } from 'src/user';
import { Can } from 'src/permissions';
import { StudentService } from './student.service';
import {
  CreateStudentDto,
  UpdateStudentDto,
  createStudentSchema,
  updateStudentSchema,
  PaginatedStudentDto,
} from './dto';
import { Student } from './entities';
import { Permissions } from './student.enum';

@SwaggerSafeController('students')
export class StudentController {
  public constructor(private readonly studentService: StudentService) {}

  @SwaggerSafeGet({ type: PaginatedStudentDto })
  @Can(Permissions.List)
  public findAll(
    @RequestUser() user: User,
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('search') search: string,
    @Query('searchIn') searchIn: string,
    @Query('orderBy') order: OrderDto[],
  ) {
    console.log({ order });
    return this.studentService.find(+page, +perPage, search, searchIn, order);
  }

  @SwaggerSafeGet({ path: ':id', type: Student })
  @Can(Permissions.Read)
  public findOne(@Param('id') id: string) {
    return this.studentService.findOneFullData(+id);
  }

  @SwaggerSafePost({ type: Student })
  @Can(Permissions.Create)
  public create(
    @Body(new ZodValidationPipe(createStudentSchema))
    createStudentDto: CreateStudentDto,
  ) {
    return this.studentService.create(createStudentDto);
  }

  @SwaggerSafePatch({ path: ':id', type: UpdateSuccessResponse })
  @Can(Permissions.Update)
  public async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateStudentSchema))
    updateStudentDto: UpdateStudentDto,
  ) {
    const [
      [userAffecteds],
      [studentAffecteds],
      [projectAffecteds],
      [coadvisorsAffecteds],
    ] = await this.studentService.update(+id, updateStudentDto);

    console.log({
      userAffecteds,
      studentAffecteds,
      projectAffecteds,
      coadvisorsAffecteds,
    });

    const affecteds =
      userAffecteds ||
      studentAffecteds ||
      projectAffecteds ||
      coadvisorsAffecteds;

    if (!affecteds) {
      throw new InternalServerErrorException(
        'Student record could not be updated',
      );
    }

    return {
      status: 'success',
      updateds: +affecteds,
      message: 'Student updated successfully',
    };
  }

  @SwaggerSafeDelete({ path: '/:id', type: DeleteSuccessResponse })
  @Can(Permissions.Delete)
  public destroy(@Param('id') id: string) {
    const deleteds = this.studentService.remove(+id);
    return {
      status: 'success',
      message: 'Student deleted successfully',
      deleteds,
    };
  }
}
