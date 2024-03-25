import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';
import { isValid, toIsoString } from 'utils';

export const createRolesSchema = z.object({
  id: z.number(),
  name: z.string().max(255),
  guard_name: z.string().max(255),
  created_at: z
      .custom(isValid.date, 'Data')
      .or(z.literal(''))
      .transform(toIsoString),
  updated_at: z
      .custom(isValid.date, 'Data')
      .or(z.literal(''))
      .transform(toIsoString),
});


export class CreateRolesDto {

  @ApiProperty({ required: true })
  id: number;

  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  guard_name: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
