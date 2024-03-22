import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';
import { isValid, toIsoString } from 'utils';

export const updatePublicationProjectSchema = z.object({
  id: z.number(),
  project_id: z.number(),
  publication_id: z.number(),
  created_at: z
      .custom(isValid.date, 'Data')
      .or(z.literal(''))
      .transform(toIsoString),
  updated_at: z
      .custom(isValid.date, 'Data')
      .or(z.literal(''))
      .transform(toIsoString),
});

export class UpdatePublicationProjectDto {

  @ApiProperty({ required: true })
  id: number;

  @ApiProperty({ required: true })
  project_id: number;

  @ApiProperty({ required: true })
  publication_id: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
