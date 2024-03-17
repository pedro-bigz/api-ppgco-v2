import { z } from 'zod';
import { isValid, toIsoString } from 'utils';

export const createStudentSchema = z.object({
  registration: z.string().max(50),
  lattes: z.string().max(100),
  scholarship: z
    .custom(isValid.date, 'Data')
    .or(z.literal(''))
    .transform(toIsoString),
  entry_date: z.custom(isValid.date, 'Data').transform(toIsoString),
  sucupira_date: z.custom(isValid.date, 'Data').transform(toIsoString),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  password: z.string(),
});

export type CreateStudentDto = z.infer<typeof createStudentSchema>;
