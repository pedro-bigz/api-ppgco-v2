import {
  Body,
  InternalServerErrorException,
  Param,
  Query,
} from '@nestjs/common';
import { ZodValidationPipe, OrderDto, Filters } from 'src/common';
import {
  SwaggerSafeController,
  SwaggerSafeDelete,
  SwaggerSafeGet,
  SwaggerSafePatch,
  SwaggerSafePost,
} from 'src/common';
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
import { DeleteSuccessResponse, UpdateSuccessResponse } from 'src/common/dto';

@SwaggerSafeController('students')
export class StudentController {
  public constructor(private readonly studentService: StudentService) {}

  @SwaggerSafeGet({ type: PaginatedStudentDto })
  @Can(Permissions.List)
  public findAll(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('search') search: string,
    @Query('searchIn') searchIn: string,
    @Query('orderBy') order: OrderDto[],
    @Query('filters') filters: Filters,
  ) {
    return this.studentService.find(
      +page,
      +perPage,
      search,
      searchIn,
      order,
      filters,
    );
  }

  // @SwaggerSafeGet({ path: '/count', type: Number })
  // @Can(Permissions.List)
  // public count(
  //   @Query('search') search: string,
  //   @Query('searchIn') searchIn: string,
  //   @Query('groupBy') groupBy: string,
  //   @Query('attributes') attributes: string | string[],
  // ) {
  //   console.log({ attributes });
  //   return this.studentService.count(search, searchIn, groupBy, attributes);
  // }

  @SwaggerSafeGet({ path: ':id', type: Student })
  @Can(Permissions.Read)
  public findOne(@Param('id') id: string) {
    return this.studentService.findWithProjectData(+id);
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
