import { MediaCollectionRepository } from '@app/media/collections/repositories';
import { Media } from '../entities';

export interface HasMedia {
  getModelName(): string;
  getModelPrimaryKey(): number;
  registerMediaCollections(): void;
  getCollectionMetadata(): Record<string, MediaCollectionRepository>;
}
