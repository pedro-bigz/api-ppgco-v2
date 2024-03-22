import { z } from 'zod';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export const createMilestoneDocumentSchema = z.object({
  doc_name: z.string().max(255),
  description: z.string().max(1024).optional(),
});

export class CreateMilestoneDocumentDto {
  @ApiProperty()
  doc_name: string;

  @ApiProperty()
  description: string;
}
