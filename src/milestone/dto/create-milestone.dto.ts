import { z } from 'zod';
import { isValid, toIsoString } from 'src/utils';
import { createMilestoneDocumentSchema } from 'src/milestone-document';
import { customCreateZodDto } from 'src/core';

export const createMilestoneSchema = z.object({
  project_ids: z.array(z.number()),
  description: z.string().max(1024).optional(),
  expected_date: z
    .custom(isValid.date, 'Data')
    .or(z.literal(''))
    .transform(toIsoString),
  meeting_collegiate: z.string().max(255).optional(),
  process_number_sei: z.string().max(255).optional(),
  need_document: z.boolean().optional(),
  situation_id: z.number(),
  documents: z.array(createMilestoneDocumentSchema.optional()),
});

export class CreateMilestoneDto extends customCreateZodDto(
  createMilestoneSchema,
) {}
