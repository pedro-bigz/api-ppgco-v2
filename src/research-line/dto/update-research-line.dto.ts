import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';
import { isValid, toIsoString } from 'utils';

export const updateResearchLineSchema = z.object({
  title: z.number(),
});

export class UpdateResearchLineDto {
  @ApiProperty({ required: true })
  title: number;
}
