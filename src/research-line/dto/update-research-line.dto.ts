import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';
import { isValid, toIsoString } from '@app/utils';
import { customCreateZodDto } from '@app/core';

export const updateResearchLineSchema = z.object({
  title: z.number(),
});

export class UpdateResearchLineDto extends customCreateZodDto(
  updateResearchLineSchema,
) {}
