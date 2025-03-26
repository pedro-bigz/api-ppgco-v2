import { z } from 'zod';
import { customCreateZodDto } from 'src/core';

export const createDocumentsSchema = z.object({
  name: z.string().max(50),
});

export class CreateDocumentsDto extends customCreateZodDto(
  createDocumentsSchema,
) {}
