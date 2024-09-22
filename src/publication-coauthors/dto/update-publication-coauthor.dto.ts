import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';
import { isValid, toIsoString } from 'src/utils';
import { customCreateZodDto } from 'src/common';

export const updatePublicationCoauthorsSchema = z.object({
  first_name: z.string().max(255).optional(),
  last_name: z.string().max(255).optional(),
  lattes: z.string().max(255).optional(),
  affiliation: z.string().max(255).optional(),
  publication_id: z.number().optional(),
});

export class UpdatePublicationCoauthorsDto extends customCreateZodDto(
  updatePublicationCoauthorsSchema,
) {}
