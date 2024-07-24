import { Module } from '@nestjs/common';
import { MilestoneSituationService } from './milestone-situation.service';
import { MilestoneSituationController } from './milestone-situation.controller';
import { milestoneSituationProviders } from './milestone-situation.providers';

@Module({
  controllers: [MilestoneSituationController],
  providers: [MilestoneSituationService, ...milestoneSituationProviders],
})
export class MilestoneSituationModule {}
