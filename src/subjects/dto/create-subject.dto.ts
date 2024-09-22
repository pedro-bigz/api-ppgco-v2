import { z } from 'zod';
import { customCreateZodDto } from 'src/common';

export const createSubjectsSchema = z.object({
  code: z.string().max(20),
  name: z.string().max(255),
  workload: z.number(),
  credits: z.number(),
  course_id: z.number(),
});

export const createSubjectsSchemaByList = z.array(createSubjectsSchema);

export class CreateSubjectsDto extends customCreateZodDto(
  createSubjectsSchema,
) {}

export class CreateSubjectsByListDto extends customCreateZodDto(
  createSubjectsSchemaByList,
) {}
