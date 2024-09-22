import { z } from 'zod';
import { customCreateZodDto } from 'src/common';

export const createRoleHasPermissionsSchema = z.object({
  permission_id: z.number(),
  role_id: z.number(),
});

export class CreateRoleHasPermissionsDto extends customCreateZodDto(
  createRoleHasPermissionsSchema,
) {}
