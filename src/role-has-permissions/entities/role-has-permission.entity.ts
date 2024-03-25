import { Permission } from '@app/permissions';
import { Role } from '@app/roles';
import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'role_has_permissions', timestamps: false })
export class RoleHasPermission extends Model {
  @Column({ primaryKey: true })
  @ForeignKey(() => Permission)
  permission_id: number;

  @Column({ primaryKey: true })
  @ForeignKey(() => Role)
  role_id: number;
}
