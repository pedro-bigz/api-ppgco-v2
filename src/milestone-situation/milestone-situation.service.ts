import { Inject, Injectable } from '@nestjs/common';
import { MILESTONE_SITUATION_REPOSITORY } from './milestone-situation.constants';
import { MilestoneSituation } from './entities';
import {
  CreateMilestoneSituationDto,
  UpdateMilestoneSituationDto,
} from './dto';
import { AppListing, OrderDto, Query } from 'src/core';

@Injectable()
export class MilestoneSituationService {
  public constructor(
    @Inject(MILESTONE_SITUATION_REPOSITORY)
    private readonly milestoneSituationModel: typeof MilestoneSituation,
  ) {}

  public findAll() {
    return this.milestoneSituationModel.findAll();
  }

  public async find(
    page: number,
    perPage: number,
    search: string,
    searchIn: string = 'id',
    order: OrderDto[],
  ) {
    return AppListing.create<typeof MilestoneSituation, MilestoneSituation>(
      this.milestoneSituationModel,
    )
      ?.attachPagination(page, perPage)
      ?.attachMultipleOrder(order ?? [['id', 'DESC']])
      ?.attachSearch(search, searchIn)
      ?.modifyQuery((query: Query<MilestoneSituation>) => {
        return {
          ...query,
        };
      })
      ?.get();
  }

  public findOne(id: number) {
    return this.milestoneSituationModel.findOne({ where: { id } });
  }
}
