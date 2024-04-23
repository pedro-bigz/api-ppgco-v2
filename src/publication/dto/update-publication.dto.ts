import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';
import { isValid, toIsoString } from '@app/utils';
import { customCreateZodDto } from '@app/core';

export const updatePublicationSchema = z.object({
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

export class UpdatePublicationDto extends customCreateZodDto(
  updatePublicationSchema,
) {}
