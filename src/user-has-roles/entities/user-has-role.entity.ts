import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from '@app/user';
import { Role } from '@app/roles';

@Table({ tableName: 'user_has_roles', timestamps: false })
export class UserHasRole extends Model {
  @Column({ primaryKey: true })
  @ForeignKey(() => Role)
  role_id: number;

  @Column({ primaryKey: true })
  @ForeignKey(() => User)
  user_id: number;
}
