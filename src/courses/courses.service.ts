import { Inject, Injectable } from '@nestjs/common';
import { COURSES_REPOSITORY } from './courses.constants';
import { Course } from './entities';
import { CreateCoursesDto, UpdateCoursesDto } from './dto';
import { AppListing, OrderDto, Query } from 'src/core';

@Injectable()
export class CoursesService {
  public constructor(
    @Inject(COURSES_REPOSITORY)
    private readonly courseModel: typeof Course,
  ) {}

  public findAll() {
    return this.courseModel.findAll();
  }

  public async find(
    page: number,
    perPage: number,
    search: string,
    searchIn: string = 'id',
    order: OrderDto[],
  ) {
    return AppListing.create<typeof Course, Course>(this.courseModel)
      ?.attachPagination(page, perPage)
      ?.attachMultipleOrder(order || [['id', 'DESC']])
      ?.attachSearch(search, searchIn)
      ?.modifyQuery((query: Query<Course>) => {
        return {
          ...query,
        };
      })
      ?.get();
  }

  public findOne(id: number) {
    return this.courseModel.findOne({ where: { id } });
  }

  public create(createCoursesDto: CreateCoursesDto) {
    return this.courseModel.create({ ...createCoursesDto });
  }

  public update(id: number, updateCoursesDto: UpdateCoursesDto) {
    return this.courseModel.update(updateCoursesDto, { where: { id } });
  }

  public remove(id: number) {
    return this.courseModel.destroy({ where: { id } });
  }
}
