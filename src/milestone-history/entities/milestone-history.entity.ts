import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { MilestoneSituation } from 'src/milestone-situation/entities';

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

  @Column(DataType.JSON)
  documents: string;

  @Column
  @ForeignKey(() => MilestoneSituation)
  situation_id: number;

  @Column
  milestone_id: number;

  @Column
  project_id: number;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @DeletedAt
  deleted_at: Date;

  @BelongsTo(() => MilestoneSituation)
  situation: MilestoneSituation;
}
