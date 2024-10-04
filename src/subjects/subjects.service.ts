import { Inject, Injectable } from '@nestjs/common';
import { CommonListing, Filters, OrderDto } from 'src/common';
import {
  SUBJECTS_REPOSITORY,
  V_SUBJECTS_REPOSITORY,
} from './subjects.constants';
import { Subject, VSubject } from './entities';
import { CreateSubjectsDto, UpdateSubjectsDto } from './dto';
import { Attributes, FindOptions } from 'sequelize';

@Injectable()
export class SubjectsService {
  public constructor(
    @Inject(SUBJECTS_REPOSITORY) private readonly model: typeof Subject,
    @Inject(V_SUBJECTS_REPOSITORY) private readonly view: typeof VSubject,
  ) {}

  public findAll(options?: FindOptions<Attributes<Subject>>) {
    return this.model.findAll(options);
  }

  public async find(
    page: number,
    perPage: number,
    search: string,
    searchIn: string,
    order: OrderDto[],
    filters?: Filters,
  ) {
    return CommonListing.create<VSubject, typeof VSubject>(this.view)
      ?.attachPagination(page, perPage)
      ?.attachMultipleOrder(order)
      ?.attachSearch(search, searchIn)
      ?.attachFilters(filters ?? {})
      ?.get();
  }

  public findOne(id: number, options?: FindOptions<Attributes<Subject>>) {
    return this.model.findOne({
      where: { id, ...(options?.where ?? {}) },
      ...options,
    });
  }

  public findOneFullData(id: number) {
    return this.model.scope('full').findOne({ where: { id } });
  }

  public findOneByScope(scope: string, id: number) {
    return this.model.scope(scope).findOne({ where: { id } });
  }

  public remove(id: number): Promise<number> | void {
    return this.model.destroy({ where: { id } });
  }

  public create(createSubjectsDto: CreateSubjectsDto) {
    return this.model.create({ ...createSubjectsDto });
  }

  public update(id: number, updateSubjectsDto: UpdateSubjectsDto) {
    return this.model.update(updateSubjectsDto, { where: { id } });
  }
}
