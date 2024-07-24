import { Module } from '@nestjs/common';
import { SystemApliancesService } from './system-apliances.service';
import { systemApliancesProviders } from './system-apliances.providers';

@Module({
  providers: [SystemApliancesService, ...systemApliancesProviders],
  exports: [SystemApliancesService],
})
export class SystemApliancesModule {}
