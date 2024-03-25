import {
  Column,
  CreatedAt,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({ tableName: 'permissions' })
export class Permission extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  name: string;

  @Column
  guard_name: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
