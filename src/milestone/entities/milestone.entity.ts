import {
  BeforeUpdate,
  BelongsTo,
  Column,
  CreatedAt,
  DefaultScope,
  DeletedAt,
  ForeignKey,
  HasMany,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Project } from 'src/project/entities';
import { MilestoneDocument } from 'src/milestone-document/entities';
import { MilestoneSituation } from 'src/milestone-situation/entities';

// export type MilestoneSituation =
//   | 'concluido'
//   | 'em_andamento'
//   | 'documentacao_pendente'
//   | 'aguardando_validacao'
//   | 'nao_iniciado';

@DefaultScope(() => ({
  include: [Project, MilestoneDocument, MilestoneSituation],
}))
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
  @ForeignKey(() => MilestoneSituation)
  situation_id: number;

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

  @HasMany(() => MilestoneDocument)
  documents: MilestoneDocument[];

  @BelongsTo(() => MilestoneSituation)
  situation: MilestoneSituation;
}
