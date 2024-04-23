import { Model } from 'sequelize-typescript';
import { Optional, BuildOptions } from 'sequelize';
import { Media } from '@app/media/entities';
import { STORAGE_DISK } from '@app/media/media.constants';
import { MediaStorage } from '@app/media/storage';
import { HasMedia } from './has-media';

export class StoredMedia extends Model {
  private storage: MediaStorage;

  public constructor(values?: Optional<any, string>, options?: BuildOptions) {
    super(values, options);
    this.storage = new MediaStorage(STORAGE_DISK);
  }

  public getDisk() {
    return this.storage.getDisk();
  }

  public getFilename() {
    return this.getDataValue('file_name');
  }

  public getPassword() {
    return this.getDataValue('custom_properties')?.password;
  }

  public getMimeType() {
    return this.getDataValue('mime_type');
  }

  public getCollectionName() {
    return this.getDataValue('collection_name');
  }

  public getEncoding() {
    return this.getDataValue('encoding');
  }

  public getSize() {
    return this.getDataValue('size');
  }

  public async blob() {
    return this.getDisk().getFile(this.getFilename(), this.getPassword());
  }

  public async buffer() {
    const fileBlob = await this.blob();
    return Buffer.from(await fileBlob.arrayBuffer());
  }

  public async getUrl() {
    return this.getDisk().mountUrl(this.getFilename());
  }

  public async storageAttempt(
    file: Express.Multer.File,
    password?: string,
    description?: string,
  ) {
    return this.getDisk().uploadFile(file, password, description);
  }

  public async destroyRemoteMedia() {
    return this.getDisk().deleteFile(this.getFilename(), this.getPassword());
  }

  static async fromMulterFile(file: Express.Multer.File, model: HasMedia) {
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

  public safeDestroy() {
    this.destroyRemoteMedia();
    this.destroy();
  }
}
