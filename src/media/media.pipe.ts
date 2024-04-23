import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import {
  MediaCollectionGroup,
  UploadedCollectionsValidation,
} from './collections';
import _capitalize from 'lodash/capitalize';

export const UploadedMediaValidationPipe = (
  collections: MediaCollectionGroup,
) => {
  @Injectable()
  class UploadedMediaPipe implements PipeTransform {
    public collections: UploadedCollectionsValidation;

    constructor() {
      this.collections = UploadedCollectionsValidation.create(collections);
    }

    transform(value: any, metadata: ArgumentMetadata) {
      this.collections.validate(value);
    }
  }

  return UploadedMediaPipe;
};
