import { Inject, Injectable } from '@nestjs/common';
import { DOCUMENTS_REPOSITORY } from './documents.constants';
import { Document } from './entities';
import { CreateDocumentsDto, UpdateDocumentsDto } from './dto';
import { CommonListing, CommonService, OrderDto, Query } from 'src/common';

@Injectable()
export class DocumentsService extends CommonService<
  Document,
  typeof Document,
  string
> {
  public constructor(
    @Inject(DOCUMENTS_REPOSITORY)
    model: typeof Document,
  ) {
    super(model);
  }

  public async find(
    page: number,
    perPage: number,
    search: string,
    searchIn: string = 'name',
    order: OrderDto[],
  ) {
    return this.getCommonListing()
      ?.attachPagination(page, perPage)
      ?.attachMultipleOrder(order || [['name', 'DESC']])
      ?.attachSearch(search, searchIn)
      ?.modifyQuery((query: Query<Document>) => {
        return {
          ...query,
        };
      })
      ?.get();
  }

  public create(createDocumentsDto: CreateDocumentsDto) {
    return this.model.create({ ...createDocumentsDto });
  }

  public update(name: string, updateDocumentsDto: UpdateDocumentsDto) {
    return this.model.update(updateDocumentsDto, { where: { name } });
  }

  public remove(name: string) {
    return this.model.destroy({ where: { name } });
  }
}
