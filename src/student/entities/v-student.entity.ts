import {
  Column,
  CreatedAt,
  DeletedAt,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { User } from 'src/user/entities';

@Table({ tableName: 'v_student' })
export class VStudent extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  registration: string;

  @Column
  lattes: string;

  @Column
  scholarship: Date;

  @Column
  entry_date: Date;

  @Column
  sucupira_date: Date;

  @Column
  first_name: string;

  @Column
  last_name: string;

  @Column
  email: string;

  @Column
  phone: string;

  @Column
  birth_date: Date;

  @Column
  forbidden: boolean;

  @Column
  project_title: string;

  @Column
  research_line_title: string;

  @Column
  student_name: string;

  @Column
  @ForeignKey(() => User)
  user_id: number;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @DeletedAt
  deleted_at: Date;
}
