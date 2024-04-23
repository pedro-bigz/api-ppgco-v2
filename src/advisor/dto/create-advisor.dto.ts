import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';
import { customCreateZodDto } from '@app/core';

export const createAdvisorSchema = z.object({
  lattes: z.string().max(50),
  research_line_id: z.number(),
});

export class CreateAdvisorDto extends customCreateZodDto(createAdvisorSchema) {}
