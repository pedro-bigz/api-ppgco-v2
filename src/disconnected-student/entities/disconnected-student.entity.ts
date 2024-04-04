import { ApiProperty } from '@nestjs/swagger';
import { Column, Model, Table } from 'sequelize-typescript';

export type DisconnectedStudentReason =
  | 'Coeficiente'
  | 'A pedido do aluno'
  | 'Prazo nao cumprido';

@Table({
  tableName: 'disconnected_student',
  timestamps: false,
})
export class DisconnectedStudent extends Model {
  @Column
  student_id: number;

  @Column
  @ApiProperty({ type: String, default: 'Prazo nao cumprido' })
  reason: DisconnectedStudentReason;

  @Column
  termination_date: Date;
}
