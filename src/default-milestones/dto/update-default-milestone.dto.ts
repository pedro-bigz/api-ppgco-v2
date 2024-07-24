import { PartialType } from '@nestjs/swagger';
import { CreateDefaultMilestoneDto } from './create-default-milestone.dto';

export class UpdateDefaultMilestoneDto extends PartialType(CreateDefaultMilestoneDto) {}
