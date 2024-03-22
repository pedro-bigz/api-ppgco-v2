import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';

export const updateMilestoneDocumentSchema = z.object({
  doc_name: z.string().max(255).optional(),
  description: z.string().max(1024).optional(),
});

export class UpdateMilestoneDocumentDto {
  @ApiProperty()
  doc_name: string;

  @ApiProperty()
  description: string;
}
