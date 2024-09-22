import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  DefaultScope,
  DeletedAt,
  ForeignKey,
  HasMany,
  Model,
  Scopes,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Project } from 'src/project/entities';
import { MilestoneSituation } from 'src/milestone-situation/entities';

@Table({ tableName: 'v_milestone' })
export class VMilestone extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  description: string;

  @Column
  expected_date: Date;

  @Column
  meeting_collegiate: string;

  @Column
  project_title: string;

  @Column
  student_project: string;

  @Column
  situation: string;

  @Column
  process_number_sei: string;

  @Column
  need_document: boolean;

  @Column
  @ForeignKey(() => MilestoneSituation)
  situation_id: number;

  @Column
  @ForeignKey(() => Project)
  project_id: number;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @DeletedAt
  deleted_at: Date;

  @BelongsTo(() => Project)
  project: Project;
}
