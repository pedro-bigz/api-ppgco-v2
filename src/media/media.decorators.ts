import { UploadedFiles } from '@nestjs/common';
import { MediaCollectionGroup } from './collections';
import { UploadedMediaValidationPipe } from './media.pipe';

export const UploadedMedia = (collections: MediaCollectionGroup) =>
  UploadedFiles(UploadedMediaValidationPipe(collections));
