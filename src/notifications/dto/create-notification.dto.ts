import { z } from 'zod';
import { customCreateZodDto } from 'src/core';

export const createNotificationsSchema = z.object({
  body: z.string().max(65535).optional(),
  title: z.string().max(255),
  notifieds: z
    .object({
      mode: z
        .literal('all')
        .or(z.literal('all_advisors'))
        .or(z.literal('all_students'))
        .or(z.literal('some_advisors'))
        .or(z.literal('some_students')),
      values: z
        .string()
        .transform((num) => +num)
        .array()
        .optional(),
    })
    .refine(({ mode, values }) => {
      return mode.startsWith('all') || (mode.startsWith('some') && values);
    }),
});

export class CreateNotificationsDto extends customCreateZodDto(
  createNotificationsSchema,
) {}
