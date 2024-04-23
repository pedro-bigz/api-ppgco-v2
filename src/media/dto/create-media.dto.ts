import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';

export const createMediaSchema = z.object({
  model_type: z.string().max(255),
  model_id: z.number(),
  uuid: z.string().max(36).optional(),
  collection_name: z.string().max(255),
  name: z.string().max(255),
  file_name: z.string().max(255),
  mime_type: z.string().max(255).optional(),
  disk: z.string().max(255),
  conversions_disk: z.string().max(255).optional(),
  size: z.number(),
  manipulations: z.string(),
  custom_properties: z.string(),
  generated_conversions: z.string(),
  responsive_images: z.string(),
  order_column: z.number().optional(),
});

export class CreateMediaDto {
  @ApiProperty({ required: true })
  model_type: string;

  @ApiProperty({ required: true })
  model_id: number;

  @ApiProperty()
  uuid: string;

  @ApiProperty({ required: true })
  collection_name: string;

  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  file_name: string;

  @ApiProperty()
  mime_type: string;

  @ApiProperty({ required: true })
  disk: string;

  @ApiProperty()
  conversions_disk: string;

  @ApiProperty({ required: true })
  size: number;

  @ApiProperty({ required: true })
  manipulations: string;

  @ApiProperty({ required: true })
  custom_properties: string;

  @ApiProperty({ required: true })
  generated_conversions: string;

  @ApiProperty({ required: true })
  responsive_images: string;

  @ApiProperty()
  order_column: number;
}
