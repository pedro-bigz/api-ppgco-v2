import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Permission } from 'src/permissions/entities';

@Table({ tableName: 'user_has_permissions' })
export class UserHasPermission extends Model {
  @Column({ primaryKey: true })
  model_id: number;

  @Column({ primaryKey: true })
  model_type: string;

  @Column({ primaryKey: true })
  @ForeignKey(() => Permission)
  permission_id: number;

  @BelongsTo(() => Permission)
  permission: Permission;
}
