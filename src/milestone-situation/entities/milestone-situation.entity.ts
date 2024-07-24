import {
  Model,
  Table,
  Column,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({ tableName: 'milestone_situation' })
export class MilestoneSituation extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  name: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
