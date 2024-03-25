import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';
import { isValid, toIsoString } from 'utils';
import { customCreateZodDto } from 'core';

export const createPublicationSchema = z.object({
  title: z.string().max(255),
  vehicle_name: z.string().max(255),
  start_date: z
    .custom(isValid.date, 'Data')
    .or(z.literal(''))
    .transform(toIsoString),
  end_date: z
    .custom(isValid.date, 'Data')
    .or(z.literal(''))
    .transform(toIsoString),
});

export class CreatePublicationDto extends customCreateZodDto(
  createPublicationSchema,
) {}
