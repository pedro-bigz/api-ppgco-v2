import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';
import { isValid, toIsoString } from 'src/utils';
import { customCreateZodDto } from 'src/core';

export const createPublicationProjectSchema = z.object({
  id: z.number(),
  project_id: z.number(),
  publication_id: z.number(),
  created_at: z
    .custom(isValid.date, 'Data')
    .or(z.literal(''))
    .transform(toIsoString),
  updated_at: z
    .custom(isValid.date, 'Data')
    .or(z.literal(''))
    .transform(toIsoString),
});

export class CreatePublicationProjectDto extends customCreateZodDto(
  createPublicationProjectSchema,
) {}
