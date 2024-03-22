import {
  Model,
  Table,
  Column,
  CreatedAt,
  DeletedAt,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({ tableName: 'milestone_document' })
export class MilestoneDocument extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  description: string;

  @Column
  doc_name: string;

  @Column
  milestone_id: number;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @DeletedAt
  deleted_at: Date;
}
