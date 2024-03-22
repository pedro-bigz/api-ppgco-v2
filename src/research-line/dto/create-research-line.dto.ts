import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';
import { isValid, toIsoString } from 'utils';

export const createResearchLineSchema = z.object({
  title: z.number(),
});

export class CreateResearchLineDto {
  @ApiProperty({ required: true })
  title: number;
}
