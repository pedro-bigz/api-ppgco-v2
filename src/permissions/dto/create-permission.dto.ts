import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';
import { isValid, toIsoString } from '@app/utils';
import { customCreateZodDto } from '@app/core';

export const createPermissionsSchema = z.object({
  name: z.string().max(255),
  guard_name: z.string().max(255),
  created_at: z
    .custom(isValid.date, 'Data')
    .or(z.literal(''))
    .transform(toIsoString),
  updated_at: z
    .custom(isValid.date, 'Data')
    .or(z.literal(''))
    .transform(toIsoString),
});

export class CreatePermissionsDto extends customCreateZodDto(
  createPermissionsSchema,
) {}
