import { Inject, Injectable } from '@nestjs/common';
import { DOCUMENTS_REPOSITORY } from './documents.constants';
import { Document } from './entities';
import { CreateDocumentsDto, UpdateDocumentsDto } from './dto';
import { AppListing, OrderDto, Query } from 'src/core';

@Injectable()
export class DocumentsService {
  public constructor(
    @Inject(DOCUMENTS_REPOSITORY)
    private readonly documentModel: typeof Document,
  ) {}

  public findAll() {
    return this.documentModel.findAll();
  }

  public async find(
    page: number,
    perPage: number,
    search: string,
    searchIn: string = 'name',
    order: OrderDto[],
  ) {
    return AppListing.create<typeof Document, Document>(this.documentModel)
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

  public findOne(name: string) {
    return this.documentModel.findOne({ where: { name } });
  }

  public create(createDocumentsDto: CreateDocumentsDto) {
    return this.documentModel.create({ ...createDocumentsDto });
  }

  public update(name: string, updateDocumentsDto: UpdateDocumentsDto) {
    return this.documentModel.update(updateDocumentsDto, { where: { name } });
  }

  public remove(name: string) {
    return this.documentModel.destroy({ where: { name } });
  }
}
