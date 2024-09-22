import { z } from 'zod';
import { customCreateZodDto } from 'src/common';

export const updateDocumentsSchema = z.object({
  name: z.string().max(50),
});

export class UpdateDocumentsDto extends customCreateZodDto(
  updateDocumentsSchema,
) {}
