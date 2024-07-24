import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';
import { isValid, toIsoString } from 'src/utils';

export const updateNotificationsSchema = z.object({
  body: z.string().max(65535).optional(),
  created_at: z
      .custom(isValid.date, 'Data')
      .or(z.literal(''))
      .transform(toIsoString),
  id: z.number(),
  title: z.string().max(255),
  updated_at: z
      .custom(isValid.date, 'Data')
      .or(z.literal(''))
      .transform(toIsoString),
});

export class UpdateNotificationsDto {

  @ApiProperty()
  body: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty({ required: true })
  id: number;

  @ApiProperty({ required: true })
  title: string;

  @ApiProperty()
  updated_at: Date;
}
