import { Model } from 'sequelize-typescript';
import _map from 'lodash/map';
import _flatten from 'lodash/flatten';
import { HasMedia } from '@app/media/abstracts';
import { MediaCollectionRepository } from './media-collection-repository';

export class MediaCollectionRepositoryHandler {
  private collections: Record<string, MediaCollectionRepository> = {};

  constructor(private model: HasMedia & Model) {
    setTimeout(() => this.model.registerMediaCollections(), 0);
  }

  public addMediaCollection(name: string) {
    const model = this.model;
    const oldCollections = this.collections;

    const collection = new MediaCollectionRepository(model, name);

    this.collections = {
      ...oldCollections,
      [name]: collection,
    };

    return collection;
  }

  public getCollection(collectionName: string) {
    return this.collections[collectionName];
  }

  public getCollections() {
    return this.collections;
  }

  public async getMedias(collectionName: string) {
    const collection = this.getCollection(collectionName);

    if (!collection) {
      return [];
    }

    return collection.getMedias();
  }
}
