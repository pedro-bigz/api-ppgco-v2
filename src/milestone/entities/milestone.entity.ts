import {
  AfterFind,
  BeforeUpdate,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  DefaultScope,
  DeletedAt,
  ForeignKey,
  HasMany,
  Model,
  Scopes,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Project } from 'src/project/entities';
import { MilestoneDocument } from 'src/milestone-document/entities';
import { MilestoneSituation } from 'src/milestone-situation/entities';
import { Student } from 'src/student';

@DefaultScope(() => ({
  attributes: ['*'],
  include: [Project, MilestoneDocument, MilestoneSituation],
}))
@Scopes(() => ({
  full: {
    include: [Project, Student, MilestoneDocument, MilestoneSituation],
  },
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

  @Column(DataType.VIRTUAL)
  get studentProject() {
    return (
      this.project.dataValues.name +
      this.project.dataValues.student.dataValues.name
    );
  }
}
