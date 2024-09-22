import {
  Column,
  CreatedAt,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Course } from 'src/courses/entities';

@Table({ tableName: 'v_subjects' })
export class VSubject extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  code: string;

  @Column
  name: string;

  @Column
  workload: number;

  @Column
  credits: number;

  @Column
  course_name: number;

  @Column
  @ForeignKey(() => Course)
  course_id: number;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  upated_at: Date;
}
