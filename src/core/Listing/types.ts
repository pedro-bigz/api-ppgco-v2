import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { FindAndCountOptions } from 'sequelize';
import { Where } from 'sequelize/types/utils';

export interface Model {
  findAndCountAll: <T>(
    options?: Omit<FindAndCountOptions<any>, 'group'> | undefined,
  ) => Promise<{ count: number; rows: T[] }>;
}

export type Query = {
  [x: string]: { [x: string]: Where | any } | number | string;
};

export type QueryModifierCallback = (query: Query) => Query;

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

export function getPaginatedResponse(type: ResponseDataType) {
  class PaginatedResponseTmp<T = typeof type> extends PaginatedResponse<T> {
    @ApiProperty({ type: [type] })
    data: T[];
  }

  return PaginatedResponseTmp;
}

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
