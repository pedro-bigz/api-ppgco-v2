import {
  BelongsTo,
  BelongsToMany,
  Column,
  CreatedAt,
  DefaultScope,
  DeletedAt,
  ForeignKey,
  HasMany,
  Model,
  Scopes,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Advisor } from 'src/advisor/entities';
import { ProjectHasCoadvisor } from 'src/project-has-coadvisor/entities';
import { Publication } from 'src/publication/entities';
import { ResearchLine } from 'src/research-line/entities';
import { Student } from 'src/student/entities';
import { Course } from 'src/courses/entities';
import { Milestone } from 'src/milestone/entities';

export type ProjectCategory = 'mestrado' | 'doutorado' | 'pos-doutorado';

@Scopes(() => ({
  full: {
    include: [Course],
  },
  // full: {
  //   include: [Course],
  // },
}))
// @DefaultScope(() => ({
//   include: [Course],
// }))
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
  @ForeignKey(() => Course)
  course_id: number;

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

  @BelongsTo(() => Course)
  course: Course;

  @BelongsTo(() => Student)
  student: Student;

  @BelongsTo(() => Advisor)
  advisor: Advisor;

  @BelongsTo(() => ResearchLine)
  researchLine: ResearchLine;

  @HasMany(() => Milestone)
  milestones: Milestone[];

  @HasMany(() => Publication)
  publications: Publication[];

  @BelongsToMany(() => Advisor, () => ProjectHasCoadvisor)
  coadvisors: Advisor[];
}
