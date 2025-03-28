import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';
import { isValid, toIsoString } from 'src/utils';
import { customCreateZodDto } from 'src/core';

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

export class CreateProjectDto extends customCreateZodDto(createProjectSchema) {}
