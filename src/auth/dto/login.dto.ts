import { ApiProperty } from '@nestjs/swagger';
import { customCreateZodDto } from '@app/core';
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export class LoginDto extends customCreateZodDto(loginSchema) {}
