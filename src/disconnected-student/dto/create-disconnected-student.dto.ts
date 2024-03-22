import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';
import { isValid, toIsoString } from 'utils';
import { DisconnectedStudentReason } from '../entities';

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

export class CreateDisconnectedStudentDto {
  @ApiProperty()
  reason: DisconnectedStudentReason;

  @ApiProperty()
  termination_date: Date;
}
