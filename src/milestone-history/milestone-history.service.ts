import { Inject, Injectable } from '@nestjs/common';
import { MILESTONE_HISTORY_REPOSITORY } from './milestone-history.constants';
import { MilestoneHistory } from './entities';
import { CreateMilestoneHistoryDto, UpdateMilestoneHistoryDto } from './dto';
import { CommonService } from 'src/core';

@Injectable()
export class MilestoneHistoryService extends CommonService<
  MilestoneHistory,
  typeof MilestoneHistory
> {
  public constructor(
    @Inject(MILESTONE_HISTORY_REPOSITORY) model: typeof MilestoneHistory,
  ) {
    super(model);
  }

  public findByMilestone(milestoneId: number) {
    return this.model.findOne({
      where: { milestone_id: milestoneId },
    });
  }

  public create(createMilestoneHistoryDto: CreateMilestoneHistoryDto) {
    return this.model.create({ ...createMilestoneHistoryDto });
  }

  public update(
    id: number,
    updateMilestoneHistoryDto: UpdateMilestoneHistoryDto,
  ) {
    return this.model.update(updateMilestoneHistoryDto, {
      where: { id },
    });
  }
}
