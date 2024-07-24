import { Body, Query, Param } from '@nestjs/common';
import { OrderDto, SwaggerSafeController, SwaggerSafeGet } from 'src/core';
import { MilestoneSituationService } from './milestone-situation.service';
import { MilestoneSituation } from './entities';

@SwaggerSafeController('milestone-situation')
export class MilestoneSituationController {
  public constructor(
    private readonly milestoneSituationService: MilestoneSituationService,
  ) {}

  @SwaggerSafeGet({ type: MilestoneSituation })
  public findAll(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('search') search: string,
    @Query('searchIn') searchIn: string,
    @Query('orderBy') order: OrderDto[],
  ) {
    return this.milestoneSituationService.find(
      +page,
      +perPage,
      search,
      searchIn,
      order,
    );
  }

  @SwaggerSafeGet({ path: ':id', type: MilestoneSituation })
  public findOne(@Param('id') id: string) {
    return this.milestoneSituationService.findOne(+id);
  }
}
