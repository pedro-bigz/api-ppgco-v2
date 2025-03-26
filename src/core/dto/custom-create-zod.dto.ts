import { z, ZodSchema } from 'zod';
import { createZodDto, ZodDto } from 'nestjs-zod';

export function customCreateZodDto(schema: ZodSchema) {
  class CustomAugmentedZodDto extends createZodDto(schema) {
    constructor(obj: z.infer<typeof schema>) {
      super();
      Object.assign(this, obj);
    }
  }

  return CustomAugmentedZodDto as unknown as ZodDto;
}
