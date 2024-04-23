import {
  AfterCreate,
  BelongsToMany,
  Column,
  CreatedAt,
  DefaultScope,
  DeletedAt,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Role } from '@app/roles';
import { UserHasRole } from '@app/user-has-roles';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { ModelWithMedia } from '@app/media';
import _first from 'lodash/first';

@DefaultScope(() => ({
  include: [Role],
}))
@Table({ tableName: 'users' })
export class User extends ModelWithMedia {
  @Column
  first_name: string;

  @Column
  last_name: string;

  @Column
  email: string;

  @Column
  @ApiHideProperty()
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

  get full_name() {
    return (
      this.getDataValue('first_name') + ' ' + this.getDataValue('last_name')
    );
  }

  @ApiProperty({})
  avatar: string;

  public registerMediaCollections(): void {
    this.mediaCollection.addMediaCollection('avatar');
  }

  public async getAvatar() {
    const medias = await this.getMedias('avatar');
    return medias[0];
  }

  public async getAvatarUrl() {
    return _first(await this.getMediaUrl('avatar'));
  }

  @AfterCreate
  static sendVerificationEmail(instance: User) {
    const { email } = instance;
    console.log({ email });
  }
}
