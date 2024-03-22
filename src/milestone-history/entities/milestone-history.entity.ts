import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'milestone_history' })
export class MilestoneHistory extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  description: string;

  @Column
  expected_date: Date;

  @Column
  meeting_collegiate: string;

  @Column
  process_number_sei: string;

  @Column
  need_document: boolean;

  @Column
  situation: string;

  @Column
  milestone_id: number;

  @Column
  project_id: number;

  @Column
  created_at: Date;

  @Column
  updated_at: Date;

  @Column
  deleted_at: Date;
}
