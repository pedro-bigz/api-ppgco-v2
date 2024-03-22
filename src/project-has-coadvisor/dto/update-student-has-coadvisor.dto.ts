import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';
import { isValid, toIsoString } from 'utils';

export const updateProjectHasCoadvisorSchema = z.object({
  student_id: z.number(),
  advisor_id: z.number(),
  start_date: z
    .custom(isValid.date, 'Data')
    .or(z.literal(''))
    .transform(toIsoString),
});

export class UpdateProjectHasCoadvisorDto {
  @ApiProperty({ required: true })
  student_id: number;

  @ApiProperty({ required: true })
  advisor_id: number;

  @ApiProperty()
  start_date: Date;
}
