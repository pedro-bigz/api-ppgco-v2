import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';


export const createUserHasPermissionsSchema = z.object({
  model_id: z.number(),
  model_type: z.string().max(255),
  permission_id: z.number(),
});


export class CreateUserHasPermissionsDto {

  @ApiProperty({ required: true })
  model_id: number;

  @ApiProperty({ required: true })
  model_type: string;

  @ApiProperty({ required: true })
  permission_id: number;
}
