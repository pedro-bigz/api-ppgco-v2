import { Advisor } from '@app/advisor';
import { ProjectHasCoadvisor } from '@app/project-has-coadvisor';
import { PublicationProject } from '@app/publication-project';
import { ResearchLine } from '@app/research-line';
import { Student } from '@app/student';
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

export type ProjectCategory = 'mestrado' | 'doutorado' | 'pos-doutorado';

@Table({ tableName: 'project' })
export class Project extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  title: string;

  @Column
  start_date: Date;

  @Column
  end_date: Date;

  @Column
  category: ProjectCategory;

  @Column
  @ForeignKey(() => ResearchLine)
  research_line_id: number;

  @Column
  @ForeignKey(() => Student)
  student_id: number;

  @Column
  @ForeignKey(() => Advisor)
  advisor_id: number;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @DeletedAt
  deleted_at: Date;

  @BelongsTo(() => Student)
  student: Student;

  @BelongsTo(() => Advisor)
  advisor: Advisor;

  @BelongsTo(() => ResearchLine)
  researchLine: ResearchLine;

  @HasMany(() => PublicationProject)
  publications: PublicationProject[];

  @BelongsToMany(() => Advisor, () => ProjectHasCoadvisor)
  coadvisors: Advisor[];
}
