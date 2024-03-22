import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';

export const createAdvisorSchema = z.object({
  lattes: z.string().max(50),
  research_line_id: z.number(),
});

export class CreateAdvisorDto {
  @ApiProperty({ required: true })
  lattes: string;

  @ApiProperty({ required: true })
  research_line_id: number;
}
