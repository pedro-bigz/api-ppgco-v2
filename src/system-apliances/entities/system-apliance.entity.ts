import { Column, CreatedAt, Table, UpdatedAt } from 'sequelize-typescript';
import { ModelWithMedia } from 'src/media';

@Table({ tableName: 'system_apliances' })
export class SystemApliance extends ModelWithMedia {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  sa_key: string;

  @Column
  sa_value: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  public registerMediaCollections(): void {
    this.mediaCollection.addMediaCollection('covers');
  }
}
