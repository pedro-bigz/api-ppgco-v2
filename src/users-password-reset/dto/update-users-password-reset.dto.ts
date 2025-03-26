import { z } from 'zod';
import { customCreateZodDto } from 'src/core';
import { isValid, toIsoString } from 'src/utils';

export const updateUsersPasswordResetSchema = z.object({
  email: z.string().max(255),
  token: z.string().max(255),
  is_expired: z.string().optional(),
  is_validated: z.string().optional(),
  created_at: z
    .custom(isValid.date, 'Data')
    .or(z.literal(''))
    .transform(toIsoString),
  updated_at: z
    .custom(isValid.date, 'Data')
    .or(z.literal(''))
    .transform(toIsoString),
});

export class UpdateUsersPasswordResetDto extends customCreateZodDto(
  updateUsersPasswordResetSchema,
) {}
