import {
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Project } from 'src/project/entities';
import { Publication } from 'src/publication/entities';

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
