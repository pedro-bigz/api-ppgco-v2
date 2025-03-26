import { z } from 'zod';
import { customCreateZodDto } from 'src/core';

export const updateDocumentsSchema = z.object({
  name: z.string().max(50),
});

export class UpdateDocumentsDto extends customCreateZodDto(
  updateDocumentsSchema,
) {}
