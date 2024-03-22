import { Advisor } from '@app/advisor';
import { Project } from '@app/project';
import {
  BelongsTo,
  Column,
  CreatedAt,
  DeletedAt,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({ tableName: 'project_has_coadvisor' })
export class ProjectHasCoadvisor extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  @ForeignKey(() => Project)
  project_id: number;

  @Column
  @ForeignKey(() => Advisor)
  advisor_id: number;

  @Column
  start_date: Date;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @DeletedAt
  deleted_at: Date;

  @BelongsTo(() => Project)
  project: Project;

  @BelongsTo(() => Advisor)
  advisor: Advisor;
}
