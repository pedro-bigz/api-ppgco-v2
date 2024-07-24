import { ApiProperty } from '@nestjs/swagger';
import { customCreateZodDto } from 'src/core';
import { z } from 'zod';

export const refreshTokenSchema = z.object({
  refreshToken: z.string(),
});

export class RefreshTokenDto extends customCreateZodDto(refreshTokenSchema) {}
