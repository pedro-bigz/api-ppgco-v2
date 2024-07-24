import { Inject, Injectable } from '@nestjs/common';
import { MILESTONE_HISTORY_REPOSITORY } from './milestone-history.constants';
import { MilestoneHistory } from './entities';
import { CreateMilestoneHistoryDto, UpdateMilestoneHistoryDto } from './dto';
import { AppListing, OrderDto, Query } from 'src/core';

@Injectable()
export class MilestoneHistoryService {
  public constructor(
    @Inject(MILESTONE_HISTORY_REPOSITORY)
    private readonly milestoneHistoryModel: typeof MilestoneHistory,
  ) {}

  public findAll() {
    return this.milestoneHistoryModel.findAll();
  }

  public async find(
    page: number,
    perPage: number,
    search: string,
    searchIn: string = 'id',
    order: OrderDto[],
  ) {
    return AppListing.create<typeof MilestoneHistory, MilestoneHistory>(
      this.milestoneHistoryModel,
    )
      ?.attachPagination(page, perPage)
      ?.attachMultipleOrder(order || [['id', 'DESC']])
      ?.attachSearch(search, searchIn)
      ?.modifyQuery((query: Query<MilestoneHistory>) => {
        return {
          ...query,
        };
      })
      ?.get();
  }

  public findOne(id: number) {
    return this.milestoneHistoryModel.findOne({ where: { id } });
  }

  public findByMilestone(milestoneId: number) {
    return this.milestoneHistoryModel.findOne({
      where: { milestone_id: milestoneId },
    });
  }

  public create(createMilestoneHistoryDto: CreateMilestoneHistoryDto) {
    return this.milestoneHistoryModel.create({ ...createMilestoneHistoryDto });
  }

  public update(
    id: number,
    updateMilestoneHistoryDto: UpdateMilestoneHistoryDto,
  ) {
    return this.milestoneHistoryModel.update(updateMilestoneHistoryDto, {
      where: { id },
    });
  }

  public remove(id: number) {
    return this.milestoneHistoryModel.destroy({ where: { id } });
  }
}
