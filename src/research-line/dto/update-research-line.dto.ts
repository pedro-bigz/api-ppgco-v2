import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';
import { isValid, toIsoString } from 'utils';
import { customCreateZodDto } from 'core';

export const updateResearchLineSchema = z.object({
  title: z.number(),
});

export class UpdateResearchLineDto extends customCreateZodDto(
  updateResearchLineSchema,
) {}
