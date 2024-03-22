import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';
import { isValid, toIsoString } from 'utils';

export const updateAdvisorSchema = z.object({
  lattes: z.string().max(50),
  research_line_id: z.number(),
});

export class UpdateAdvisorDto {
  @ApiProperty({ required: true })
  lattes: string;

  @ApiProperty({ required: true })
  research_line_id: number;
}
