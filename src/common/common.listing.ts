import {
  Model,
  ModelStatic,
  FindAndCountOptions,
  Order,
  Sequelize,
} from 'sequelize';
import { Type } from '@nestjs/common';
import _last from 'lodash/last';
import _omit from 'lodash/omit';
import _camelCase from 'lodash/camelCase';
import _isEmpty from 'lodash/isEmpty';
import _reduce from 'lodash/reduce';
import _trim from 'lodash/trim';
import { fileGetContents, insensitiveLike } from 'src/utils';
import {
  OrderDto,
  PaginaginatedListingPromise,
  WhereOptions,
  QueryModifierCallback,
  Filters,
  FilterData,
} from './types/listing.types';
import { includeOperator, Op, Operations } from './filter.operations';
import { User } from 'src/user';
import { includes } from 'lodash';

export class CommonListing<M extends Model, T extends Type & ModelStatic<M>> {
  private page: number;
  private perPage: number;
  private orders: Order[] = [];
  private search: string;
  private searchIn: string;
  private filters: Filters;
  private queryModifier: QueryModifierCallback<M, T>;

  public static defaultPage = 1;
  public static defaultPerPage = 10;

  public constructor(private readonly model: T) {}

  public static create<M extends Model, T extends Type & ModelStatic<M>>(
    model: T | string,
  ) {
    const modelInstance = typeof model === 'string' ? eval(model) : model;
    return new CommonListing<M, T>(modelInstance);
  }

  public attachPagination(page: number, perPage: number) {
    this.page = page;
    this.perPage = perPage;

    return this;
  }

  public resetOrder() {
    this.orders = [];

    return this;
  }

  public attachOrder(orderBy: string, orderDirection: 'ASC' | 'DESC') {
    this.orders.push([...orderBy.split('.'), orderDirection]);

    return this;
  }

  private resolveOrderEntry(order: OrderDto[] = []) {
    return order.map(([col, value]) => {
      return [...col.split('.'), value];
    }) as Order[];
  }

  public attachOrderObj(order: Record<string, 'ASC' | 'DESC'>) {
    if (_isEmpty(order)) return;

    this.orders = [
      ...this.orders,
      ...this.resolveOrderEntry(Object.entries(order)),
    ];

    return this;
  }

  public attachMultipleOrder(order: OrderDto[]) {
    this.orders = this.resolveOrderEntry(order);

    return this;
  }

  public attachSearch(search: string, searchIn: string) {
    this.search = search;
    this.searchIn = this.formatColumnName(searchIn);

    return this;
  }

  public attachFilters(filters: Filters) {
    this.filters = filters;

    return this;
  }

  public formatColumnName(name: string = '') {
    return `$${name.includes('.') ? name : this.model.name + '.' + name}$`;
  }

  public modifyQuery(queryModifier: QueryModifierCallback<M, T>) {
    this.queryModifier = queryModifier;

    return this;
  }

  public buildPagination() {
    if (isNaN(this.page)) this.page = CommonListing.defaultPage;
    if (isNaN(this.perPage)) this.perPage = CommonListing.defaultPerPage;

    const limit = this.perPage;
    const offset = this.perPage * (this.page - 1);

    return {
      offset,
      limit,
    };
  }

  public buildSearch() {
    const search =
      !this.search || !this.searchIn
        ? {}
        : {
            [this.searchIn]: insensitiveLike(this.search, this.searchIn),
          };

    return { search };
  }

  private processLikeClauseContent(likeContent: string) {
    return `%${likeContent}%`;
  }

  private processInClauseContent(inContent: string) {
    return inContent.split(',').map((content: string) => {
      const value = _trim(content);

      if (isNaN(+value)) {
        return value;
      }

      return +value;
    });
  }

  private processBetweenClauseContent(betweenContent: string[]) {
    return betweenContent.map((content: string) => {
      const value = _trim(content);

      if (isNaN(+value)) {
        return value;
      }

      return +value;
    });
  }

  public buildFilter(filter: FilterData, key: string) {
    const column = this.formatColumnName(key);

    if (!filter.operator) {
      return { [column]: { [Op.eq]: filter.content[0] } };
    }

    const operator = Op[filter.operator];
    const isLikeOp = includeOperator(filter.operator, [
      Operations.contains,
      Operations.notContains,
    ]);

    if (isLikeOp) {
      return {
        [column]: {
          [operator]: this.processLikeClauseContent(filter.content[0]),
        },
      };
    }

    const isInOp = includeOperator(filter.operator, [
      Operations.in,
      Operations.notIn,
    ]);

    if (isInOp) {
      return {
        [column]: {
          [operator]: this.processInClauseContent(filter.content[0]),
        },
      };
    }

    const isBetweenOp = includeOperator(filter.operator, [
      Operations.between,
      Operations.notBetween,
    ]);

    if (isBetweenOp) {
      return {
        [column]: {
          [operator]: this.processBetweenClauseContent(filter.content),
        },
      };
    }

    return { [column]: { [Op[filter.operator]]: filter.content[0] } };
  }

  public buildFilters() {
    const formatFilters = (accum: any, filter: FilterData, key: string) => {
      return { ...accum, ...this.buildFilter(filter, key) };
    };

    return { filters: _reduce(this.filters, formatFilters, {}) };
  }

  public buildOrder() {
    const order = this.orders;
    return { order };
  }

  public mergeSearchWithFilters(filters: any, search: any) {
    if (this.searchIn in filters && this.searchIn in search) {
      return {
        ..._omit(filters, this.searchIn),
        ..._omit(search, this.searchIn),
        [Op.and]: [
          { [this.searchIn]: search[this.searchIn] },
          { [this.searchIn]: filters[this.searchIn] },
        ],
      };
    }

    return { ...filters, ...search };
  }

  public buildQuery() {
    const { offset, limit } = this.buildPagination();
    const { filters } = this.buildFilters();
    const { search } = this.buildSearch();
    const { order } = this.buildOrder();

    const searchQuery = {
      where: this.mergeSearchWithFilters(filters, search) as WhereOptions<M>,
      order: order as Order,
      offset,
      limit,
    };

    const modifiedQuery = this?.queryModifier
      ? this.queryModifier(searchQuery, this)
      : searchQuery;

    return modifiedQuery;
  }

  private async prepare(columns?: string[]) {
    const query = this.buildQuery();

    return this.model.findAndCountAll<M>({
      attributes: columns,
      raw: true,
      subQuery: false,
      ...query,
    } as FindAndCountOptions);
  }

  public async get(columns?: string[]): PaginaginatedListingPromise<M> {
    const { count: totalItems, rows: data } = await this.prepare(columns);
    const totalPages = Math.ceil(totalItems / this.perPage);

    const result = {
      data,
      totalPages,
      totalItems,
      page: this.page,
      perPage: this.perPage,
      nextPage: this.page < totalPages ? this.page + 1 : undefined,
      prevPage: this.page > 1 ? this.page - 1 : undefined,
    };

    return result;
  }
}
