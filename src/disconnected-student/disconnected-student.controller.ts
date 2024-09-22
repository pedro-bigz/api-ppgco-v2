import { Body, Query, Param } from '@nestjs/common';
import { ZodValidationPipe, OrderDto } from 'src/common';
import {
  SwaggerSafeController,
  SwaggerSafeGet,
  SwaggerSafePost,
} from 'src/common';
import { DisconnectedStudentService } from './disconnected-student.service';
import {
  CreateDisconnectedStudentDto,
  createDisconnectedStudentSchema,
  PaginatedDisconnectedStudentDto,
} from './dto';
import { Can } from 'src/permissions';
import { Permissions } from './disconnected-student.enum';
import { DisconnectedStudent } from './entities';

@SwaggerSafeController('disconnect-student')
export class DisconnectedStudentController {
  public constructor(
    private readonly disconnectedStudentService: DisconnectedStudentService,
  ) {}

  @SwaggerSafeGet({ type: PaginatedDisconnectedStudentDto })
  @Can(Permissions.List)
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

  @SwaggerSafeGet({ path: ':id', type: DisconnectedStudent })
  @Can(Permissions.Read)
  public findOne(@Param('id') id: string) {
    return this.disconnectedStudentService.findOne(+id);
  }

  @SwaggerSafePost({ path: ':studentId', type: DisconnectedStudent })
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
