import { z } from 'zod';
import { isValid, toIsoString } from '@app/utils';
import { customCreateZodDto } from '@app/core';

export const createDisconnectedStudentSchema = z.object({
  reason: z
    .literal('Coeficiente')
    .or(z.literal('A pedido do aluno'))
    .or(z.literal('Prazo nao cumprido')),
  termination_date: z
    .custom(isValid.date, 'Data')
    .or(z.literal(''))
    .transform(toIsoString),
});

export class CreateDisconnectedStudentDto extends customCreateZodDto(
  createDisconnectedStudentSchema,
) {}
