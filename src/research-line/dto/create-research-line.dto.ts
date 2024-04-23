import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';
import { isValid, toIsoString } from '@app/utils';
import { customCreateZodDto } from '@app/core';

export const createResearchLineSchema = z.object({
  title: z.number(),
});

export class CreateResearchLineDto extends customCreateZodDto(
  createResearchLineSchema,
) {}
