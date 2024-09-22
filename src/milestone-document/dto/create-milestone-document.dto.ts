import { z } from 'zod';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { customCreateZodDto } from 'src/common';

export const createMilestoneDocumentSchema = z.object({
  doc_name: z.string().max(255),
  description: z.string().max(1024).optional(),
});

export class CreateMilestoneDocumentDto extends customCreateZodDto(
  createMilestoneDocumentSchema,
) {}
