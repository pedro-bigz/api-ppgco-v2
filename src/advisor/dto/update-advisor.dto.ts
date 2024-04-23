import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';
import { isValid, toIsoString } from '@app/utils';
import { customCreateZodDto } from '@app/core';

export const updateAdvisorSchema = z.object({
  lattes: z.string().max(50),
  research_line_id: z.number(),
});

export class UpdateAdvisorDto extends customCreateZodDto(updateAdvisorSchema) {}
