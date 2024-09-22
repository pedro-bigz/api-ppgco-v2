import { Inject, Injectable } from '@nestjs/common';
import { COURSES_REPOSITORY } from './courses.constants';
import { Course } from './entities';
import { CreateCoursesDto, UpdateCoursesDto } from './dto';
import { CommonListing, CommonService, OrderDto, Query } from 'src/common';

@Injectable()
export class CoursesService extends CommonService<Course, typeof Course> {
  public constructor(@Inject(COURSES_REPOSITORY) courseModel: typeof Course) {
    super(courseModel);
  }

  public create(createCoursesDto: CreateCoursesDto) {
    return this.model.create({ ...createCoursesDto });
  }

  public update(id: number, updateCoursesDto: UpdateCoursesDto) {
    return this.model.update(updateCoursesDto, { where: { id } });
  }
}
