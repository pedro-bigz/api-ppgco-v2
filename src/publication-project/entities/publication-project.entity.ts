import { Project } from '@app/project';
import { Publication } from '@app/publication/entities';
import {
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({ tableName: 'publication_project' })
export class PublicationProject extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  @ForeignKey(() => Project)
  project_id: number;

  @Column
  @ForeignKey(() => Publication)
  publication_id: number;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @BelongsTo(() => Project)
  project: Project;

  @BelongsTo(() => Publication)
  publication: Publication;
}
