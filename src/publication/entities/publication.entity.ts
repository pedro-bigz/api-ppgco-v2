import {
  Column,
  CreatedAt,
  DeletedAt,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Project } from 'src/project/entities';

@Table({ tableName: 'publication' })
export class Publication extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  title: string;

  @Column
  vehicle_name: string;

  @Column
  start_date: Date;

  @Column
  end_date: Date;

  @Column
  @ForeignKey(() => Project)
  project_id: number;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @DeletedAt
  deleted_at: Date;
}
