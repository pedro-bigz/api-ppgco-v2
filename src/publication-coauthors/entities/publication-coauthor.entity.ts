import {
  Column,
  CreatedAt,
  DeletedAt,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({ tableName: 'publication_coauthors' })
export class PublicationCoauthor extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  first_name: string;

  @Column
  last_name: string;

  @Column
  lattes: string;

  @Column
  affiliation: string;

  @Column
  publication_id: number;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @DeletedAt
  deleted_at: Date;
}
