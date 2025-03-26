import { Model } from 'sequelize-typescript';
import { Optional, BuildOptions } from 'sequelize';
import { Media } from 'src/media/entities';
import { STORAGE_DISK } from 'src/media/media.constants';
import { MediaStorage } from 'src/media/storage';
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

  public safeDestroy() {
    this.destroyRemoteMedia();
    this.destroy();
  }
}
