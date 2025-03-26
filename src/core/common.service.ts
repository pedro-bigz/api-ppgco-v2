import { Type } from '@nestjs/common';
import {
  Attributes,
  FindOptions,
  ModelStatic,
  Sequelize,
  Transaction,
} from 'sequelize';
import { Model } from 'sequelize-typescript';
import { CommonListing } from './common.listing';
import { Filters, OrderDto } from './types/listing.types';
import { User } from 'src/user';
import { Fn } from 'sequelize/types/utils';
import { includes } from 'lodash';
import { Project } from 'src/project';

export type CreationAdditionalData = {
  transaction?: Transaction;
};

export class CommonService<
  M extends Model,
  T extends Type & ModelStatic<M>,
  PKType = Number,
> {
  public constructor(protected readonly model: T) {}

  public findAll(options?: FindOptions<Attributes<M>>) {
    return this.model.findAll(options);
  }

  public getCommonListing() {
    return CommonListing.create<M, T>(this.model);
  }

  public attachPaginatedListing(
    page: number,
    perPage: number,
    search: string,
    searchIn: string,
    order: OrderDto[],
    filters?: Filters,
  ) {
    return this.getCommonListing()
      ?.attachPagination(page, perPage)
      ?.attachMultipleOrder(order)
      ?.attachSearch(search, searchIn)
      ?.attachFilters(filters ?? {});
  }

  public async find(
    page: number,
    perPage: number,
    search: string,
    searchIn: string,
    order: OrderDto[],
    filters?: Filters,
    _user?: User,
  ) {
    return this.attachPaginatedListing(
      page,
      perPage,
      search,
      searchIn,
      order,
      filters,
    )?.get();
  }

  public findOne(id: PKType, options?: FindOptions<Attributes<M>>) {
    return this.model.findOne({
      where: { id, ...(options?.where ?? {}) },
      ...options,
    });
  }

  public findOneFullData(id: PKType) {
    return this.model.scope('full').findOne({ where: { id } });
  }

  public findOneByScope(scope: string, id: PKType) {
    return this.model.scope(scope).findOne({ where: { id } });
  }

  public remove(id: PKType): Promise<number> | void {
    return this.model.destroy({ where: { id } });
  }
}
