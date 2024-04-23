import {
  Column,
  CreatedAt,
  Table,
  UpdatedAt,
  BeforeCreate,
  BeforeSave,
} from 'sequelize-typescript';
import { generateUUID } from '@app/utils';
import { StoredMedia } from '../abstracts';

export interface MediaInputData {
  name: string;
  file_name: string;
  mime_type: string;
  disk: string;
  size: number;
}

@Table({ tableName: 'media' })
export class Media extends StoredMedia {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  model_type: string;

  @Column
  model_id: number;

  @Column
  uuid: string;

  @Column
  collection_name: string;

  @Column
  name: string;

  @Column
  file_name: string;

  @Column
  mime_type: string;

  @Column
  disk: string;

  @Column
  conversions_disk: string;

  @Column
  size: number;

  @Column
  order_column: number;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @BeforeSave
  @BeforeCreate
  static beforeCreateTreatment(instance: Media) {
    instance.uuid = generateUUID();
  }
}
