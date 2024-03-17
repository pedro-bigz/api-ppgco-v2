import { z } from 'zod';

export const updateUserSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  password: z.string(),
});

export type UpdateUserDto = Partial<z.infer<typeof updateUserSchema>>;
