import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';


export const createUserHasRolesSchema = z.object({
  role_id: z.number(),
  model_type: z.string().max(255),
  model_id: z.number(),
});


export class CreateUserHasRolesDto {

  @ApiProperty({ required: true })
  role_id: number;

  @ApiProperty({ required: true })
  model_type: string;

  @ApiProperty({ required: true })
  model_id: number;
}
