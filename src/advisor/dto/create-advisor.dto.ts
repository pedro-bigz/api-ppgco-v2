import { z } from 'zod';
import { customCreateZodDto } from 'src/core';
import dayjs from 'dayjs';

const validateDate = (date: string) => dayjs(date).isValid();

export const createAdvisorSchema = z.object({
  lattes: z.string().max(50).optional(),
  phone: z.string().max(20).optional(),
  research_line_id: z
    .number()
    .min(1, 'O campo de linha de pesquisa é obrigatório'),
  birth_date: z.custom(validateDate, 'Data de nascimento inválida'),
  email: z.string().email().min(1, 'O campo de email deve ser preenchido'),
  first_name: z.string().min(1, 'O campo de nome deve ser preenchido'),
  last_name: z.string().min(1, 'O campo de sobrenome deve ser preenchido'),
});

export const createAdvisorByListSchema = z.array(createAdvisorSchema);

export class CreateAdvisorDto extends customCreateZodDto(createAdvisorSchema) {}
export class CreateAdvisorByListDto extends customCreateZodDto(
  createAdvisorByListSchema,
) {}
