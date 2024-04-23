import { Column, CreatedAt, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'activations', updatedAt: false })
export class Activation extends Model {
  @Column
  email: string;

  @Column
  token: string;

  @Column
  used: boolean;

  @CreatedAt
  created_at: Date;
}
