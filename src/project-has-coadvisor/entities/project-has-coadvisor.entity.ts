import {
  BelongsTo,
  Column,
  CreatedAt,
  DefaultScope,
  DeletedAt,
  ForeignKey,
  Model,
  Scopes,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Advisor } from 'src/advisor/entities';
import { Project } from 'src/project/entities';

@Scopes(() => ({
  withTrashed: {
    paranoid: false,
  },
}))
@DefaultScope(() => ({
  include: [Project, Advisor],
}))
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
