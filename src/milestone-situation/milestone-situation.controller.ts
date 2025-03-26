import { Query, Param, Get, Controller } from '@nestjs/common';
import { OrderDto } from 'src/core';
import { MilestoneSituationService } from './milestone-situation.service';
import { MilestoneSituation } from './entities';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('milestone-situation')
export class MilestoneSituationController {
  public constructor(
    private readonly milestoneSituationService: MilestoneSituationService,
  ) {}

  @Get()
  @ApiOkResponse({ type: MilestoneSituation })
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

  @Get(':id')
  @ApiOkResponse({ type: MilestoneSituation })
  public findOne(@Param('id') id: string) {
    return this.milestoneSituationService.findOne(+id);
  }
}
