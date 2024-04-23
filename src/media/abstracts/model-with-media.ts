import { Optional, BuildOptions } from 'sequelize';
import { Model } from 'sequelize-typescript';
import _flatMap from 'lodash/flatMap';
import _isEmpty from 'lodash/isEmpty';

import { Media } from '@app/media/entities';
import { MediaCollectionRepositoryHandler } from '@app/media/collections';
import { HasMedia } from './has-media';

export abstract class ModelWithMedia extends Model implements HasMedia {
  protected mediaCollection: MediaCollectionRepositoryHandler;

  public constructor(values?: Optional<any, string>, options?: BuildOptions) {
    super(values, options);
    this.mediaCollection = new MediaCollectionRepositoryHandler(this);
  }

  public abstract registerMediaCollections(): void;

  public getModelName(): string {
    return this.constructor.name;
  }

  private getModelPrimaryKeyName(): string {
    return Object.getPrototypeOf(this).constructor.primaryKeyAttribute;
  }

  public getModelPrimaryKey(): number {
    return this.getDataValue(this.getModelPrimaryKeyName());
  }

  public getCollectionMetadata() {
    return this.mediaCollection.getCollections();
  }

  public async getMedias(collectionName: string) {
    this.registerMediaCollections();
    return this.mediaCollection.getMedias(collectionName);
  }

  public async getMediaUrl(collectionName: string) {
    return this.getMedias(collectionName).then((medias) =>
      medias.map((media) => media.getUrl()),
    );
  }

  public async saveFiles(files: Record<string, Express.Multer.File[]>) {
    return new Promise(async (resolve, reject) => {
      const [firstUpload, ...uploadedFiles] = _flatMap(files, (items) => items);

      const resolveWhenIsUnique = (media: Media) => {
        if (_isEmpty(uploadedFiles)) resolve(media);
      };

      await Media.fromMulterFile(firstUpload, this)
        .then(resolveWhenIsUnique)
        .catch(reject);

      const storing = uploadedFiles.map((file) =>
        Media.fromMulterFile(file, this),
      );

      return Promise.all(storing).then(resolve).catch(reject);
    });
  }
}
