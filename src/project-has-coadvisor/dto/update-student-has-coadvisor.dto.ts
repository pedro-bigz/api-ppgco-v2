import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';
import { isValid, toIsoString } from '@app/utils';
import { customCreateZodDto } from '@app/core';

export const updateProjectHasCoadvisorSchema = z.object({
  student_id: z.number(),
  advisor_id: z.number(),
  start_date: z
    .custom(isValid.date, 'Data')
    .or(z.literal(''))
    .transform(toIsoString),
});

export class UpdateProjectHasCoadvisorDto extends customCreateZodDto(
  updateProjectHasCoadvisorSchema,
) {}
