import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Notification } from './notification.entity';
import { User } from 'src/user';

@Table({ tableName: 'notifications_users', timestamps: false })
export class NotificationUsers extends Model {
  @Column({ primaryKey: true })
  @ForeignKey(() => Notification)
  notification_id: number;

  @Column({ primaryKey: true })
  @ForeignKey(() => User)
  user_id: number;

  @Column
  received: Boolean;

  @Column
  viewed: Boolean;

  @Column
  received_at: Date;

  @Column
  viewed_at: Date;

  @BelongsTo(() => Notification)
  notification: Notification;

  @BelongsTo(() => User)
  user: User;
}
