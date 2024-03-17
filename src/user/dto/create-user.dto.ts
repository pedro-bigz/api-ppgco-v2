import { z } from 'zod';

export const createUserSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  password: z.string(),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
