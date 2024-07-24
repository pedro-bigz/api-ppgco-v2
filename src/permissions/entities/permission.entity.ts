import {
  Column,
  CreatedAt,
  HasMany,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { RoleHasPermission } from 'src/role-has-permissions';
import { UserHasPermission } from 'src/user-has-permissions';

@Table({ tableName: 'permissions' })
export class Permission extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  name: string;

  @Column
  guard_name: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @HasMany(() => RoleHasPermission)
  roleHasPermission: RoleHasPermission;

  @HasMany(() => UserHasPermission)
  userHasPermission: UserHasPermission;
}
