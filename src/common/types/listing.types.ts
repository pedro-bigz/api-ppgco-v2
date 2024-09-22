import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  Model,
  ModelStatic,
  FindAndCountOptions,
  Attributes,
  WhereOptions as SequelizeWhereOptions,
} from 'sequelize';
import { CommonListing } from '../common.listing';

export type OrderDto = [string, 'ASC' | 'DESC'];

export type QueryOptions<M extends Model> = FindAndCountOptions<Attributes<M>>;

export type Query<M extends Model> = Omit<QueryOptions<M>, 'group'>;

export type WhereOptions<M extends Model> = SequelizeWhereOptions<
  Attributes<M>
>;

export type FilterData = { content: any[]; operator: string };
export type Filters = Record<string, FilterData>;

export interface QueryModifierCallback<
  M extends Model,
  T extends Type & ModelStatic<M>,
> {
  (query: Query<M>, current: CommonListing<M, T>): Query<M>;
}

export interface PaginatedResponseInterface<M> {
  data: M[];
  page: number;
  perPage: number;
  nextPage?: number;
  prevPage?: number;
  totalPages: number;
  totalItems: number;
}

export type ResponseDataType = Type<unknown> | Function | [Function] | string;

export abstract class PaginatedResponse<M>
  implements PaginatedResponseInterface<M>
{
  abstract data: M[];

  @ApiProperty()
  page: number;

  @ApiProperty()
  perPage: number;

  @ApiProperty()
  nextPage?: number;

  @ApiProperty()
  prevPage?: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  totalItems: number;

  constructor(args?: PaginatedResponseInterface<M>) {
    Object.assign(this, args ?? {});
  }
}

export type PaginaginatedListingPromise<E> = Promise<
  PaginatedResponseInterface<E> | undefined
>;
