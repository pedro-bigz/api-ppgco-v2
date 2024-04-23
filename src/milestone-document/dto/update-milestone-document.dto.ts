import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';
import { customCreateZodDto } from '@app/core';

export const updateMilestoneDocumentSchema = z.object({
  doc_name: z.string().max(255).optional(),
  description: z.string().max(1024).optional(),
});

export class UpdateMilestoneDocumentDto extends customCreateZodDto(
  updateMilestoneDocumentSchema,
) {}
