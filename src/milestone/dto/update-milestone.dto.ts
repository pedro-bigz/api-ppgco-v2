import { z } from 'zod';
import { isValid, toIsoString } from 'src/utils';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { updateMilestoneDocumentSchema } from 'src/milestone-document';
import { customCreateZodDto } from 'src/common';

export const updateMilestoneSchema = z.object({
  project_id: z.number(),
  description: z.string().max(1024).optional(),
  expected_date: z
    .custom(isValid.date, 'Data')
    .or(z.literal(''))
    .transform(toIsoString),
  meeting_collegiate: z.string().max(255).optional(),
  process_number_sei: z.string().max(255).optional(),
  need_document: z.boolean().optional(),
  situation_id: z.number(),
  documents: z.array(updateMilestoneDocumentSchema.optional()),
});

export class UpdateMilestoneDto extends customCreateZodDto(
  updateMilestoneSchema,
) {}
