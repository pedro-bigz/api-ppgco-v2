import {
  BelongsTo,
  BelongsToMany,
  Column,
  CreatedAt,
  HasMany,
  Model,
  Scopes,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { User } from 'src/user/entities';
import { NotificationUsers } from './notification-users.entity';

@Scopes(() => ({
  full: {
    include: [User, NotificationUsers],
  },
  withUsers: {
    include: [User],
  },
  withNotifieds: {
    include: [NotificationUsers],
  },
}))
@Table({ tableName: 'notifications' })
export class Notification extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  title: string;

  @Column
  body: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @BelongsToMany(() => User, () => NotificationUsers)
  users: User[];

  @HasMany(() => NotificationUsers)
  notifieds: NotificationUsers[];
}
