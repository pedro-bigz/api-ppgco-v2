import { z } from 'zod';
import { isValid, toIsoString } from 'src/utils';
import { customCreateZodDto } from 'src/common';

export const createStudentSchema = z.object({
  registration: z.string().max(50),
  lattes: z.string().max(100),
  title: z.string().max(100),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  birth_date: z.string().transform(toIsoString),
  phone: z.string(),
  course_id: z.number(),
  research_line_id: z.number(),
  scholarship: z
    .custom(isValid.date, 'Scholarship date is invalid')
    .or(z.literal(''))
    .transform((date: string) => {
      return date ? toIsoString(date) : null;
    }),
  entry_date: z
    .custom(isValid.date, 'Entry date is invalid')
    .transform(toIsoString),
  sucupira_date: z
    .custom(isValid.date, 'Sucupira date is invalid')
    .transform(toIsoString),
  start_date: z
    .custom(isValid.date, 'Start date is invalid')
    .transform(toIsoString),
  end_date: z
    .custom(isValid.date, 'End date is invalid')
    .transform(toIsoString),
  // password: z.string(),
  advisor_id: z.number(),
  coadvisors: z.array(z.number()),
});

export class CreateStudentDto extends customCreateZodDto(createStudentSchema) {}
