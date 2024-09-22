import {
  BelongsTo,
  Column,
  CreatedAt,
  DefaultScope,
  DeletedAt,
  ForeignKey,
  HasOne,
  Model,
  Scopes,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { User } from 'src/user/entities';
import { Project } from 'src/project/entities';

// @DefaultScope(() => ({
//   include: [User],
// }))
@Scopes(() => ({
  withUser: {
    include: [User],
  },
  withProject: {
    include: [Project],
  },
  full: {
    include: [User, Project],
  },
  onlyRelations: {
    include: [
      { model: User, attributes: [] },
      { model: Project, attributes: [] },
    ],
  },
}))
@Table({ tableName: 'student' })
export class Student extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  registration: string;

  @Column
  lattes: string;

  @Column
  scholarship: Date;

  @Column
  entry_date: Date;

  @Column
  sucupira_date: Date;

  @Column
  @ForeignKey(() => User)
  user_id: number;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @DeletedAt
  deleted_at: Date;

  @BelongsTo(() => User)
  user: User;

  @HasOne(() => Project)
  project: Project;
}
