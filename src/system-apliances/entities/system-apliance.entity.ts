import {
  Column,
  CreatedAt,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({ tableName: 'system_apliances' })
export class SystemApliance extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  sa_key: string;

  @Column
  sa_value: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
