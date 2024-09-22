import {
  Column,
  CreatedAt,
  DeletedAt,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { ResearchLine } from 'src/research-line/entities';
import { User } from 'src/user/entities';

@Table({ tableName: 'v_advisor' })
export class VAdvisor extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  @ForeignKey(() => User)
  id: number;

  @Column
  lattes: string;

  @Column
  @ForeignKey(() => ResearchLine)
  research_line_id: number;

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
  research_line_title: string;

  @Column
  advisor_name: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @DeletedAt
  deleted_at: Date;
}
