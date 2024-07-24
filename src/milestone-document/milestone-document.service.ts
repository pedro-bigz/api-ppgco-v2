import { Inject, Injectable } from '@nestjs/common';
import { AppListing, OrderDto, Query } from 'src/core';
import { MILESTONE_DOCUMENT_REPOSITORY } from './milestone-document.constants';
import { MilestoneDocument } from './entities';
import {
  BulkCreateMilestoneDocumentDto,
  CreateMilestoneDocumentDto,
  UpdateMilestoneDocumentDto,
} from './dto';
import { Transaction } from 'sequelize';
import { Op } from 'sequelize';

interface MilestoneDocumentCreationAdditionalData {
  transaction?: Transaction;
}

@Injectable()
export class MilestoneDocumentService {
  public constructor(
    @Inject(MILESTONE_DOCUMENT_REPOSITORY)
    private readonly milestoneDocumentModel: typeof MilestoneDocument,
  ) {}

  public findAll() {
    return this.milestoneDocumentModel.findAll();
  }

  public async find(
    page: number,
    perPage: number,
    search: string,
    searchIn: string = 'id',
    order: OrderDto[],
  ) {
    return AppListing.create<typeof MilestoneDocument, MilestoneDocument>(
      this.milestoneDocumentModel,
    )
      ?.attachPagination(page, perPage)
      ?.attachMultipleOrder(order || [['id', 'DESC']])
      ?.attachSearch(search, searchIn)
      ?.modifyQuery((query: Query<MilestoneDocument>) => {
        return {
          ...query,
        };
      })
      ?.get();
  }

  public findOne(id: number) {
    return this.milestoneDocumentModel.findOne({ where: { id } });
  }

  public create(
    milestoneId: number,
    createMilestoneDocumentDto: CreateMilestoneDocumentDto,
    additionalData?: MilestoneDocumentCreationAdditionalData,
  ) {
    return this.milestoneDocumentModel.create(
      {
        ...createMilestoneDocumentDto,
        milestone_id: milestoneId,
      },
      additionalData,
    );
  }

  public bulkCreate(
    bulkCreateMilestoneDocumentDto: BulkCreateMilestoneDocumentDto[],
  ) {
    return this.milestoneDocumentModel.bulkCreate(
      bulkCreateMilestoneDocumentDto,
    );
  }

  public update(
    id: number,
    updateMilestoneDocumentDto: UpdateMilestoneDocumentDto,
  ) {
    return this.milestoneDocumentModel.update(updateMilestoneDocumentDto, {
      where: { id },
    });
  }

  public remove(id: number) {
    return this.milestoneDocumentModel.destroy({ where: { id } });
  }

  public destroyFromMilestone(milestoneId: number) {
    return this.milestoneDocumentModel.destroy({
      where: { milestone_id: milestoneId },
    });
  }

  public bulkDestroy(ids: number[]) {
    return this.milestoneDocumentModel.destroy({
      where: { id: { [Op.in]: ids } },
    });
  }
}
