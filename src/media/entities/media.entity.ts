import {
  Column,
  CreatedAt,
  Table,
  UpdatedAt,
  BeforeCreate,
  BeforeSave,
} from 'sequelize-typescript';
import { generateUUID } from 'src/utils';
import { HasMedia, StoredMedia } from '../abstracts';
import { STORAGE_DISK } from '../media.constants';

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

  static async fromMulterFile(
    file: Express.Multer.File,
    model: HasMedia,
  ): Promise<Media> {
    const media = new Media();

    const storedFile = await media.storageAttempt(file);

    media.model_type = model.getModelName();
    media.model_id = model.getModelPrimaryKey();
    media.collection_name = file.fieldname;
    media.name = file.originalname;
    media.mime_type = file.mimetype;
    media.size = file.size;
    media.order_column = 1;
    media.disk = STORAGE_DISK;
    media.file_name = storedFile.path + storedFile.extension;

    return media.save();
  }
}
