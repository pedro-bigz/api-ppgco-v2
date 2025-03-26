import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';
import { isValid, toIsoString } from 'src/utils';
import { customCreateZodDto } from 'src/core';

export const createPublicationCoauthorsSchema = z.object({
  first_name: z.string().max(255),
  last_name: z.string().max(255),
  lattes: z.string().max(255),
  affiliation: z.string().max(255),
  publication_id: z.number().optional(),
});

export class CreatePublicationCoauthorsDto extends customCreateZodDto(
  createPublicationCoauthorsSchema,
) {}
