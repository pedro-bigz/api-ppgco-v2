import { Inject, Injectable } from '@nestjs/common';
import { DISCONNECTED_STUDENT_REPOSITORY } from './disconnected-student.constants';
import { DisconnectedStudent } from './entities';
import { CreateDisconnectedStudentDto } from './dto';
import { AppListing, OrderDto, Query } from 'src/core';

@Injectable()
export class DisconnectedStudentService {
  public constructor(
    @Inject(DISCONNECTED_STUDENT_REPOSITORY)
    private readonly disconnectedStudentModel: typeof DisconnectedStudent,
  ) {}

  public findAll() {
    return this.disconnectedStudentModel.findAll();
  }

  public async find(
    page: number,
    perPage: number,
    search: string,
    searchIn: string = 'student_id',
    order: OrderDto[],
  ) {
    return AppListing.create<typeof DisconnectedStudent, DisconnectedStudent>(
      this.disconnectedStudentModel,
    )
      ?.attachPagination(page, perPage)
      ?.attachMultipleOrder(order || [['student_id', 'DESC']])
      ?.attachSearch(search, searchIn)
      ?.modifyQuery((query: Query<DisconnectedStudent>) => {
        return {
          ...query,
        };
      })
      ?.get();
  }

  public findOne(student_id: number) {
    return this.disconnectedStudentModel.findOne({ where: { student_id } });
  }

  public disconnectStudent(
    studentId: number,
    { reason, termination_date }: CreateDisconnectedStudentDto,
  ) {
    return this.disconnectedStudentModel.create({
      student_id: studentId,
      reason,
      termination_date: !termination_date ? new Date() : termination_date,
    });
  }
}
