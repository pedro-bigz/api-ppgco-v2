import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';
import { customCreateZodDto } from 'src/common';

export const createUserHasRolesSchema = z.object({
  role_id: z.number(),
  user_id: z.number(),
});

export class CreateUserHasRolesDto extends customCreateZodDto(
  createUserHasRolesSchema,
) {}
