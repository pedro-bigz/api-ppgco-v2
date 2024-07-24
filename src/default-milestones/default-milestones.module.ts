import { Module } from '@nestjs/common';
import { DefaultMilestonesService } from './default-milestones.service';
import { DefaultMilestonesController } from './default-milestones.controller';
import { SystemApliancesModule } from 'src/system-apliances';
import { CoursesModule } from 'src/courses';

@Module({
  imports: [SystemApliancesModule, CoursesModule],
  controllers: [DefaultMilestonesController],
  providers: [DefaultMilestonesService],
  exports: [DefaultMilestonesService],
})
export class DefaultMilestonesModule {}
