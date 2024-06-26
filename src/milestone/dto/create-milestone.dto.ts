import { z } from 'zod';
import { isValid, toIsoString } from '@app/utils';
import { MilestoneSituation } from '../entities';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  CreateMilestoneDocumentDto,
  createMilestoneDocumentSchema,
} from '@app/milestone-document';
import { customCreateZodDto } from '@app/core';

export const createMilestoneSchema = z.object({
  description: z.string().max(1024).optional(),
  expected_date: z
    .custom(isValid.date, 'Data')
    .or(z.literal(''))
    .transform(toIsoString),
  meeting_collegiate: z.string().max(255).optional(),
  process_number_sei: z.string().max(255).optional(),
  need_document: z.string().optional(),
  situation: z.string().max(12).optional(),
  document: createMilestoneDocumentSchema.optional(),
});

export class CreateMilestoneDto extends customCreateZodDto(
  createMilestoneSchema,
) {}
