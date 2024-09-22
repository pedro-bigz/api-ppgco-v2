import { ApiProperty } from '@nestjs/swagger';
import { customCreateZodDto } from 'src/common';
import { z } from 'zod';

export const refreshTokenSchema = z.object({
  refreshToken: z.string(),
});

export class RefreshTokenDto extends customCreateZodDto(refreshTokenSchema) {}
