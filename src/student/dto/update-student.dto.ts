import { z } from 'zod';
import { isValid, toIsoString } from 'utils';
import { ApiProperty } from '@nestjs/swagger';

export const updateStudentSchema = z.object({
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

export class UpdateStudentDto {
  @ApiProperty()
  registration: string;

  @ApiProperty()
  lattes: string;

  @ApiProperty()
  scholarship: string;

  @ApiProperty()
  entry_date: string;

  @ApiProperty()
  sucupira_date: string;

  @ApiProperty()
  first_name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
