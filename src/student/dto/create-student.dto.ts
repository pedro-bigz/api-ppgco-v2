import { z } from 'zod';
import { isValid, toIsoString } from 'utils';
import { ApiProperty } from '@nestjs/swagger';
import { customCreateZodDto } from 'core';

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

export class CreateStudentDto extends customCreateZodDto(createStudentSchema) {}
