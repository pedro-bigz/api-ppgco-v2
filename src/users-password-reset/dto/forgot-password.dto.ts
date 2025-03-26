import { customCreateZodDto } from 'src/core';
import { z } from 'zod';

export const forgotPasswordSchema = z.object({
  email: z.string(),
});

export class ForgotPasswordDto extends customCreateZodDto(
  forgotPasswordSchema,
) {}
