import { z } from 'zod';
import { customCreateZodDto } from 'src/core';

export const updateRoleHasPermissionsSchema = z.object({
  permission_id: z.number(),
  role_id: z.number(),
});

export class UpdateRoleHasPermissionsDto extends customCreateZodDto(
  updateRoleHasPermissionsSchema,
) {}
