import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Role } from 'src/roles/entities';
import { Permission } from 'src/permissions/entities';

@Table({ tableName: 'role_has_permissions', timestamps: false })
export class RoleHasPermission extends Model {
  @Column({ primaryKey: true })
  @ForeignKey(() => Permission)
  permission_id: number;

  @Column({ primaryKey: true })
  @ForeignKey(() => Role)
  role_id: number;

  @BelongsTo(() => Permission)
  permission: Permission;

  @BelongsTo(() => Role)
  role: Role;
}
