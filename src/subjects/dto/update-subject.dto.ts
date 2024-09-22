import { z } from 'zod';
import { customCreateZodDto } from 'src/common';

export const updateSubjectsSchema = z.object({
  code: z.string().max(20),
  name: z.string().max(255),
  workload: z.number(),
  credits: z.number(),
  course_id: z.number(),
});

export class UpdateSubjectsDto extends customCreateZodDto(
  updateSubjectsSchema,
) {}
