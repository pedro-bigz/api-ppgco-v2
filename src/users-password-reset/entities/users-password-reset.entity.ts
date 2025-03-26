import { Column, CreatedAt, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'users_password_reset', updatedAt: false })
export class UsersPasswordReset extends Model {
  @Column({ primaryKey: true })
  email: string;

  @Column({ primaryKey: true })
  token: string;

  @Column
  is_expired: boolean;

  @Column
  is_validated: boolean;

  @CreatedAt
  created_at: Date;
}
