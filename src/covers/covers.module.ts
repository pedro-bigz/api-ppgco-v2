import { Module } from '@nestjs/common';
import { CoversService } from './covers.service';
import { CoversController } from './covers.controller';
import { SystemApliancesModule } from 'src/system-apliances';

@Module({
  imports: [SystemApliancesModule],
  controllers: [CoversController],
  providers: [CoversService],
})
export class CoversModule {}
