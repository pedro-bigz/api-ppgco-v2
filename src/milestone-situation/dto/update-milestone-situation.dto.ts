import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';
import { isValid, toIsoString } from 'src/utils';

export const updateMilestoneSituationSchema = z.object({
  id: z.number(),
  name: z.string().max(50),
  created_at: z
      .custom(isValid.date, 'Data')
      .or(z.literal(''))
      .transform(toIsoString),
  updated_at: z
      .custom(isValid.date, 'Data')
      .or(z.literal(''))
      .transform(toIsoString),
});

export class UpdateMilestoneSituationDto {

  @ApiProperty({ required: true })
  id: number;

  @ApiProperty({ required: true })
  name: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
