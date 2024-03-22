import {
  BelongsTo,
  BelongsToMany,
  Column,
  CreatedAt,
  DeletedAt,
  ForeignKey,
  HasMany,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { ProjectHasCoadvisor } from '@app/project-has-coadvisor';
import { ResearchLine } from '@app/research-line';
import { Student } from '@app/student';
import { Project } from '@app/project';

@Table({ tableName: 'advisor' })
export class Advisor extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  lattes: string;

  @Column
  @ForeignKey(() => ResearchLine)
  research_line_id: number;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @DeletedAt
  deleted_at: Date;

  @BelongsTo(() => ResearchLine)
  researchLine: ResearchLine;

  @HasMany(() => Project)
  projects: Project[];
}
