import {
  BelongsTo,
  Column,
  CreatedAt,
  DefaultScope,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Course } from 'src/courses/entities';

@DefaultScope(() => ({
  include: [Course],
}))
@Table({ tableName: 'subjects' })
export class Subject extends Model {
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
  @ForeignKey(() => Course)
  course_id: number;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  upated_at: Date;

  @BelongsTo(() => Course)
  course: Course;
}
