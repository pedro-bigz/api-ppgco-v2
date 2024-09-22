import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';
import { isValid, toIsoString } from 'src/utils';
import { customCreateZodDto } from 'src/common';

export const createResearchLineSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
});

export class CreateResearchLineDto extends customCreateZodDto(
  createResearchLineSchema,
) {}
