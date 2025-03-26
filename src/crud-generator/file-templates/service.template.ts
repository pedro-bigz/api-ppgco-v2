import { TemplateCompiler } from './base.template';

export const getCompiler = (props: object) => {
  return TemplateCompiler.create()
    .setContent(
      `
import { Inject, Injectable } from '@nestjs/common';
import { <%= model.repository %> } from './<%= constantsPath %>';
import { <%= model.type %> } from './entities';
import { <%= dto.create.type %>, <%= dto.update.type %> } from './dto';
import { CommonListing, OrderDto, Query } from 'src/common';

@Injectable()
export class <%= serviceClassName %> {
  public constructor(
    @Inject(<%= model.repository %>)
    private readonly model: typeof <%= model.type %>,
  ) {}

  public findAll() {
    return this.model.findAll();
  }

  public async find(
    page: number,
    perPage: number,
    search: string,
    searchIn: string = '<%= primaryKey.name %>',
    order: OrderDto[],
  ) {
    return CommonListing.create<<%= model.type %>, typeof <%= model.type %>>(this.model)
      ?.attachPagination(page, perPage)
      ?.attachMultipleOrder(order || [['<%= primaryKey.name %>', 'DESC']])
      ?.attachSearch(search, searchIn)
      ?.modifyQuery((query: Query<<%= model.type %>>) => {
        return {
          ...query,
        };
      })
      ?.get();
  }

  public findOne(<%= primaryKey.name %>: <%= primaryKey.type %>) {
    return this.model.findOne({ where: { <%= primaryKey.name %> } });
  }

  public create(<%= dto.create.name %>: <%= dto.create.type %>) {
    return this.model.create({ ...<%= dto.create.name %> });
  }

  public update(<%= primaryKey.name %>: <%= primaryKey.type %>, <%= dto.update.name %>: <%= dto.update.type %>) {
    return this.model.update(<%= dto.update.name %>, { where: { <%= primaryKey.name %> } });
  }

  public remove(<%= primaryKey.name %>: <%= primaryKey.type %>) {
    return this.model.destroy({ where: { <%= primaryKey.name %> } });
  }
}`,
    )
    .setProps(props)
    .compile();
};
