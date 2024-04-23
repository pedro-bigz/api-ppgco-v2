import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import _map from 'lodash/map';
import {
  MediaCollectionGroup,
  UploadedCollectionsValidation,
} from './collections';

export const UseMediaValidatorInterceotor = (
  collections: MediaCollectionGroup,
) => {
  const uploadedCollections = UploadedCollectionsValidation.create(collections);
  return applyDecorators(
    UseInterceptors(
      FileFieldsInterceptor(uploadedCollections.getMulterFields()),
    ),
  );
};
