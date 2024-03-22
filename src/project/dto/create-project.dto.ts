import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';
import { isValid, toIsoString } from 'utils';

export const createProjectSchema = z.object({
  title: z.string().max(255),
  start_date: z
    .custom(isValid.date, 'Data')
    .or(z.literal(''))
    .transform(toIsoString),
  end_date: z
    .custom(isValid.date, 'Data')
    .or(z.literal(''))
    .transform(toIsoString),
  category: z.string().max(13).optional(),
  research_line_id: z.number(),
  student_id: z.number(),
  advisor_id: z.number(),
});

export class CreateProjectDto {
  @ApiProperty({ required: true })
  title: string;

  @ApiProperty()
  start_date: Date;

  @ApiProperty()
  end_date: Date;

  @ApiProperty()
  category: string;

  @ApiProperty({ required: true })
  research_line_id: number;

  @ApiProperty({ required: true })
  student_id: number;

  @ApiProperty({ required: true })
  advisor_id: number;
}
