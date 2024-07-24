import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import _groupBy from 'lodash/groupBy';
import { CoursesService } from 'src/courses';
import { DefaultMilestonesService } from './default-milestones.service';
import { UpdateDefaultMilestoneDto } from './dto';

@Controller('default-milestones')
export class DefaultMilestonesController {
  constructor(
    private readonly defaultMilestonesService: DefaultMilestonesService,
    private readonly coursesService: CoursesService,
  ) {}

  @Get()
  public async findAll() {
    const courses = await this.coursesService.findAll();
    const defaultMilestones = _groupBy(
      await this.defaultMilestonesService.findAll(),
      'courseId',
    );

    const data = courses.map(({ dataValues: course }) => {
      const { milestones, updated_at: updatedAt } =
        defaultMilestones[course.id][0];

      return {
        courseId: course.id,
        courseName: course.name,
        amountDefaultMilestones: milestones.length,
        milestones,
        updatedAt,
      };
    });

    return {
      data,
      page: 1,
      prevPage: null,
      nextPage: null,
      totalPages: 1,
    };
  }

  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.defaultMilestonesService.findOne(+id);
  }

  @Patch(':id')
  public update(
    @Param('id') id: string,
    @Body() updateDefaultMilestoneDto: UpdateDefaultMilestoneDto,
  ) {
    return this.defaultMilestonesService.update(+id, updateDefaultMilestoneDto);
  }
}
