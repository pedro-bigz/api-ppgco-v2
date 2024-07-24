import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';
import { isValid, toIsoString } from 'src/utils';

export const createCoursesSchema = z.object({
  id: z.number(),
  name: z.string().max(255),
  created_at: z
      .custom(isValid.date, 'Data')
      .or(z.literal(''))
      .transform(toIsoString),
  upated_at: z
      .custom(isValid.date, 'Data')
      .or(z.literal(''))
      .transform(toIsoString),
});


export class CreateCoursesDto {

  @ApiProperty({ required: true })
  id: number;

  @ApiProperty({ required: true })
  name: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  upated_at: Date;
}
