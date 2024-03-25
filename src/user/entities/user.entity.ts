import {
  AfterCreate,
  BelongsToMany,
  Column,
  CreatedAt,
  DefaultScope,
  DeletedAt,
  Model,
  Scopes,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Role } from '@app/roles';
import { UserHasRole } from '@app/user-has-roles';

@DefaultScope(() => ({
  include: [Role],
}))
@Table({ tableName: 'users' })
export class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  first_name: string;

  @Column
  last_name: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column
  remember_token: string;

  @Column
  email_verified_at: Date;

  @Column
  activated: boolean;

  @Column
  language: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @DeletedAt
  deleted_at: Date;

  @BelongsToMany(() => Role, () => UserHasRole)
  roles: Role[];

  @AfterCreate
  static sendVerificationEmail(instance: User) {
    console.log(instance);
  }
}
