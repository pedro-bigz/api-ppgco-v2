import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  AfterCreate,
  AfterFind,
  AfterSync,
  BelongsToMany,
  Column,
  CreatedAt,
  DefaultScope,
  DeletedAt,
  HasMany,
  Scopes,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import _first from 'lodash/first';
import _trimStart from 'lodash/trimStart';
import _trimEnd from 'lodash/trimEnd';
import _snakeCase from 'lodash/snakeCase';
import { ModelWithMedia } from 'src/media';
import { Role } from 'src/roles/entities';
import { UserHasRole } from 'src/user-has-roles/entities';

interface constructor<T> {
  new (...args: any[]): T;
}

function setCustomAttributes<T>(instance: T, ModelClass: constructor<T>) {
  function findGetAttributeMethods(instance: T) {
    return Object.getOwnPropertyNames(instance).filter((name) => {
      return (
        typeof instance[name] === 'function' && /^get.*Attribute$/.test(name)
      );
    });
  }

  const methodNames = findGetAttributeMethods(instance);
  const attributeNames = methodNames.map((name) =>
    _snakeCase(_trimEnd(_trimStart(name, 'get'), 'Attribute')),
  );

  console.log({
    properties: Object.getOwnPropertyNames(instance),
    methodNames,
    attributeNames,
  });

  attributeNames.forEach((attributeName, index) => {
    ModelClass.prototype[attributeName] = methodNames[index];
  });
}

@Scopes(() => ({
  full: {
    include: [Role],
  },
}))
@DefaultScope(() => ({
  include: [Role],
  attributes: { exclude: ['password', 'remember_token', 'email_verified_at'] },
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
  phone: string;

  @Column
  @ApiHideProperty()
  password: string;

  @Column
  remember_token: string;

  @Column
  email_verified_at: Date;

  @Column
  last_login_at: Date;

  @Column
  activated: boolean;

  @Column
  language: string;

  @Column
  birth_date: Date;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @DeletedAt
  deleted_at: Date;

  @BelongsToMany(() => Role, () => UserHasRole)
  roles: Role[];

  @HasMany(() => UserHasRole)
  userHasRole: UserHasRole;

  @ApiProperty({})
  @Column(DataTypes.VIRTUAL)
  avatar: string;

  // @AfterFind
  // public static formatFones(instance: User) {
  //   console.log({ user: instance });
  //   console.log({ phone: formatFones(instance.dataValues.phone ?? '') });
  //   instance.dataValues.phone = formatFones(instance.dataValues.phone ?? '');
  // }

  @Column(DataTypes.VIRTUAL)
  public get full_name() {
    return (
      this.getDataValue('first_name') + ' ' + this.getDataValue('last_name')
    );
  }

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

  public is(...roleNames: string[]) {
    const counterRoles = (accum: number, role: Role) => {
      return accum + +roleNames.includes(role.name);
    };
    const roles = this.getDataValue('roles').dataValues;
    const count = roles.reduce(counterRoles, 0);

    return count === roleNames.length;
  }
}
