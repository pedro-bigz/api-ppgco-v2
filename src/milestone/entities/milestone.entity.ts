import { Project } from '@app/project';
import {
  BeforeUpdate,
  BelongsTo,
  Column,
  CreatedAt,
  DeletedAt,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

export type MilestoneSituation =
  | 'concluido'
  | 'em_andamento'
  | 'documentacao_pendente'
  | 'aguardando_validacao'
  | 'nao_iniciado';

@Table({ tableName: 'milestone' })
export class Milestone extends Model {
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
  situation: MilestoneSituation;

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
