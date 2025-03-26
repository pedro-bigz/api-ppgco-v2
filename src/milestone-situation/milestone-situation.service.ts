import { Inject, Injectable, NotImplementedException } from '@nestjs/common';
import { MILESTONE_SITUATION_REPOSITORY } from './milestone-situation.constants';
import { MilestoneSituation } from './entities';
import { CommonService } from 'src/core';

@Injectable()
export class MilestoneSituationService extends CommonService<
  MilestoneSituation,
  typeof MilestoneSituation
> {
  public constructor(
    @Inject(MILESTONE_SITUATION_REPOSITORY) model: typeof MilestoneSituation,
  ) {
    super(model);
  }

  public remove(_id: number) {
    throw new NotImplementedException();
  }
}
