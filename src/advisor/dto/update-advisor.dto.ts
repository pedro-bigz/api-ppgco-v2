import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';
import { isValid, toIsoString } from 'utils';
import { customCreateZodDto } from 'core';

export const updateAdvisorSchema = z.object({
  lattes: z.string().max(50),
  research_line_id: z.number(),
});

export class UpdateAdvisorDto extends customCreateZodDto(updateAdvisorSchema) {}
