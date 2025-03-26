import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';
import { isValid, toIsoString } from 'src/utils';
import { customCreateZodDto } from 'src/core';

export const updateResearchLineSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
});

export class UpdateResearchLineDto extends customCreateZodDto(
  updateResearchLineSchema,
) {}
