import { Inject, Injectable } from '@nestjs/common';
import { SUBJECTS_REPOSITORY } from './subjects.constants';
import { Subject } from './entities';
import { CreateSubjectsDto, UpdateSubjectsDto } from './dto';
import { AppListing, OrderDto, Query } from 'src/core';

@Injectable()
export class SubjectsService {
  public constructor(
    @Inject(SUBJECTS_REPOSITORY)
    private readonly subjectModel: typeof Subject,
  ) {}

  public findAll() {
    return this.subjectModel.findAll();
  }

  public async find(
    page: number,
    perPage: number,
    search: string,
    searchIn: string = 'id',
    order: OrderDto[],
  ) {
    console.log(this.subjectModel.name);
    return AppListing.create<typeof Subject, Subject>(this.subjectModel)
      ?.attachPagination(page, perPage)
      ?.attachMultipleOrder(order || [['id', 'DESC']])
      ?.attachSearch(search, searchIn)
      ?.modifyQuery((query: Query<Subject>) => {
        return {
          ...query,
        };
      })
      ?.get();
  }

  public findOne(id: number) {
    return this.subjectModel.findOne({ where: { id } });
  }

  public create(createSubjectsDto: CreateSubjectsDto) {
    return this.subjectModel.create({ ...createSubjectsDto });
  }

  public update(id: number, updateSubjectsDto: UpdateSubjectsDto) {
    return this.subjectModel.update(updateSubjectsDto, { where: { id } });
  }

  public remove(id: number) {
    return this.subjectModel.destroy({ where: { id } });
  }
}
