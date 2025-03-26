import { Inject, Injectable } from '@nestjs/common';
import { CommonService, CreationAdditionalData } from 'src/core';
import { MILESTONE_DOCUMENT_REPOSITORY } from './milestone-document.constants';
import { MilestoneDocument } from './entities';
import {
  BulkCreateMilestoneDocumentDto,
  CreateMilestoneDocumentDto,
  UpdateMilestoneDocumentDto,
} from './dto';
import { Op } from 'sequelize';

@Injectable()
export class MilestoneDocumentService extends CommonService<
  MilestoneDocument,
  typeof MilestoneDocument
> {
  public constructor(
    @Inject(MILESTONE_DOCUMENT_REPOSITORY) model: typeof MilestoneDocument,
  ) {
    super(model);
  }

  public create(
    milestoneId: number,
    createMilestoneDocumentDto: CreateMilestoneDocumentDto,
    additionalData?: CreationAdditionalData,
  ) {
    return this.model.create(
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
    return this.model.bulkCreate(bulkCreateMilestoneDocumentDto);
  }

  public update(
    id: number,
    updateMilestoneDocumentDto: UpdateMilestoneDocumentDto,
  ) {
    return this.model.update(updateMilestoneDocumentDto, {
      where: { id },
    });
  }

  public destroyFromMilestone(milestoneId: number) {
    return this.model.destroy({
      where: { milestone_id: milestoneId },
    });
  }

  public bulkDestroy(ids: number[]) {
    return this.model.destroy({
      where: { id: { [Op.in]: ids } },
    });
  }
}
