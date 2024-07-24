import {
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
import { ResearchLine } from 'src/research-line/entities';
import { Project } from 'src/project/entities';
import { User } from 'src/user/entities';

@DefaultScope(() => ({
  include: [User, ResearchLine],
}))
@Table({ tableName: 'advisor' })
export class Advisor extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  @ForeignKey(() => User)
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

  @BelongsTo(() => User)
  user: User;
}
