import { Injectable } from '@nestjs/common';
import {
  CreateDefaultMilestoneDto,
  UpdateDefaultMilestoneDto,
  DefaultMilestonesDto,
} from './dto';
import { SystemApliance, SystemApliancesService } from 'src/system-apliances';

@Injectable()
export class DefaultMilestonesService {
  public constructor(private systemApliancesService: SystemApliancesService) {}

  async findAll() {
    const aplianceValues = await this.systemApliancesService.findLike(
      `default\_milestones\_course\__`,
    );

    if (!aplianceValues) return [];

    return aplianceValues.map((apliance: SystemApliance) => {
      const { sa_key, sa_value, updated_at } = apliance.dataValues;

      const courseId = sa_key.replace('default_milestones_course_', '');
      const milestones = JSON.parse(sa_value) as DefaultMilestonesDto[];

      return { courseId, milestones, updated_at };
    });
  }

  async findOne(courseId: number) {
    console.log('findOne', { courseId });
    const aplianceValues = await this.systemApliancesService.findApliance(
      'default_milestones_course_' + courseId,
    );

    if (!aplianceValues?.dataValues?.sa_value) {
      return [];
    }

    console.log(aplianceValues?.dataValues?.sa_value);

    const defaultMilestones = JSON.parse(
      aplianceValues.dataValues.sa_value,
    ) as DefaultMilestonesDto[];

    return defaultMilestones;
  }

  update(
    courseId: number,
    updateDefaultMilestoneDto: UpdateDefaultMilestoneDto,
  ) {
    return this.systemApliancesService.updateFrom(
      'default_milestones_course_' + courseId,
      JSON.stringify(updateDefaultMilestoneDto),
    );
  }
}
