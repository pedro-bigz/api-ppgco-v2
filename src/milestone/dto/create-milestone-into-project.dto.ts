import { z } from 'zod';
import { isValid, toIsoString } from 'src/utils';
import { createMilestoneDocumentSchema } from 'src/milestone-document';
import { customCreateZodDto } from 'src/core';

export const createMilestoneIntoProjectSchema = z.object({
  description: z.string().max(1024).optional(),
  expected_date: z
    .custom(isValid.date, 'Data')
    .or(z.literal(''))
    .transform(toIsoString),
  meeting_collegiate: z.string().max(255).optional(),
  process_number_sei: z.string().max(255).optional(),
  need_document: z.string().optional(),
  situation_id: z.number(),
  document: createMilestoneDocumentSchema.optional(),
});

export class CreateMilestoneIntoProjectDto extends customCreateZodDto(
  createMilestoneIntoProjectSchema,
) {}
