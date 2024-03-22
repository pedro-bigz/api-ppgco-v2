import { Inject, Injectable } from '@nestjs/common';
import { AppListing, Query } from 'core';
import { MILESTONE_DOCUMENT_REPOSITORY } from './milestone-document.constants';
import { MilestoneDocument } from './entities';
import { CreateMilestoneDocumentDto, UpdateMilestoneDocumentDto } from './dto';

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
    order: Record<string, 'ASC' | 'DESC'>,
  ) {
    return AppListing.create<typeof MilestoneDocument>(
      this.milestoneDocumentModel,
    )
      ?.attachPagination(page, perPage)
      ?.attachOrderObj(order || { id: 'DESC' })
      ?.attachSearch(search, searchIn)
      ?.modifyQuery((query: Query) => {
        return {
          ...query,
        };
      })
      ?.get<MilestoneDocument>();
  }

  public findOne(id: number) {
    return this.milestoneDocumentModel.findOne({ where: { id } });
  }

  public create(
    milestoneId: number,
    createMilestoneDocumentDto: CreateMilestoneDocumentDto,
  ) {
    return this.milestoneDocumentModel.create({
      ...createMilestoneDocumentDto,
      milestone_id: milestoneId,
    });
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
}
