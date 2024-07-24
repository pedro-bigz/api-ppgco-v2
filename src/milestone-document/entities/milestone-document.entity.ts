import {
  Model,
  Table,
  Column,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Milestone } from 'src/milestone/entities';

@Table({ tableName: 'milestone_document' })
export class MilestoneDocument extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  description: string;

  @Column
  doc_name: string;

  @Column
  @ForeignKey(() => Milestone)
  milestone_id: number;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @BelongsTo(() => Milestone)
  milestone: Milestone;
}
