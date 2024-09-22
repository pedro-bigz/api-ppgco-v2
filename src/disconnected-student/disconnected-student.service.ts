import { Inject, Injectable } from '@nestjs/common';
import { DISCONNECTED_STUDENT_REPOSITORY } from './disconnected-student.constants';
import { DisconnectedStudent } from './entities';
import { CreateDisconnectedStudentDto } from './dto';
import { CommonListing, CommonService, OrderDto, Query } from 'src/common';

@Injectable()
export class DisconnectedStudentService extends CommonService<
  DisconnectedStudent,
  typeof DisconnectedStudent
> {
  public constructor(
    @Inject(DISCONNECTED_STUDENT_REPOSITORY)
    model: typeof DisconnectedStudent,
  ) {
    super(model);
  }

  public async find(
    page: number,
    perPage: number,
    search: string,
    searchIn: string = 'student_id',
    order: OrderDto[],
  ) {
    return this.getCommonListing()
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

  public disconnectStudent(
    studentId: number,
    { reason, termination_date }: CreateDisconnectedStudentDto,
  ) {
    return this.model.create({
      student_id: studentId,
      reason,
      termination_date: !termination_date ? new Date() : termination_date,
    });
  }
}
