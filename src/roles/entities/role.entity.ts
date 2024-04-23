import { Permission } from '@app/permissions';
import { RoleHasPermission } from '@app/role-has-permissions';
import {
  BelongsToMany,
  Column,
  CreatedAt,
  DefaultScope,
  Model,
  Scopes,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@DefaultScope(() => ({
  // include: [Permission],
}))
@Table({ tableName: 'roles' })
export class Role extends Model {
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

  @BelongsToMany(() => Permission, () => RoleHasPermission)
  permissions: Permission[];
}
