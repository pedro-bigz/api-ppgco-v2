import {
  BadRequestException,
  Injectable,
  PayloadTooLargeException,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { MulterField } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import _ from 'lodash';

import { env } from 'process';

export type MediaCollectionMetadata = {
  maxSize?: number;
  maxCount?: number;
  accepteds?: string[];
  required?: boolean;
};

export type MediaCollectionGroup = Record<string, MediaCollectionMetadata>;

export type MapSchemaTypes = {
  string: string;
  integer: number;
};

export type MapSchema<T extends Record<string, keyof MapSchemaTypes>> = {
  -readonly [K in keyof T]: MapSchemaTypes[T[K]];
};

@Injectable()
export class UploadedCollectionsValidation {
  private validations: MediaCollectionGroup;

  public constructor(validations: MediaCollectionGroup) {
    this.validations = this.formatValidations(validations);
  }

  public static create(validations: MediaCollectionGroup = {}) {
    return new this(validations);
  }

  public setValidation(validations: MediaCollectionGroup = {}) {
    this.validations = this.formatValidations(validations);
    return this;
  }

  private formatValidations(validations: MediaCollectionGroup) {
    if (_.isEmpty(validations)) return {};

    return _.mapValues(validations, (validation: MediaCollectionMetadata) => ({
      accepteds: validation.accepteds ?? [env.DEFAULT_FILE_UPLOADEDS_TYPE!],
      maxSize: validation.maxSize ?? +env.DEFAULT_MAX_FILE_UPLOADEDS_SIZE!,
      maxCount: validation.maxCount ?? +env.DEFAULT_MAX_FILE_UPLOADEDS!,
      required: validation.required ?? false,
    }));
  }

  public addValidation(
    collectionName: string,
    validation: MediaCollectionMetadata = {},
  ) {
    const oldValidations = this.validations;
    const newValidations = this.formatValidations({
      [collectionName]: validation,
    });

    this.validations = {
      ...oldValidations,
      ...newValidations,
    };
  }

  public getMulterFields(): Array<MulterField> {
    const convertToMulterField = (
      validation: MediaCollectionMetadata,
      name: string,
    ) => ({
      name,
      maxCount: validation.maxCount,
    });
    return _.map(this.validations, convertToMulterField);
  }

  public validate(files: Record<string, Express.Multer.File[]>) {
    return _.mapValues(this.validations, this.getFileValidationCallback(files));
  }

  private getFileValidationCallback(
    files: Record<string, Express.Multer.File[]>,
  ) {
    return (validation: MediaCollectionMetadata, name: string) => {
      const groupFiles = files?.[name] ?? [];

      console.log({ files, name });

      if (validation.required && groupFiles.length === 0) {
        throw new BadRequestException(`The files ${name} are required`);
      }

      if (validation.maxCount && groupFiles.length > validation.maxCount) {
        throw new PayloadTooLargeException(
          `The number of files exceeded the allowed limit (max: ${validation.maxCount})`,
        );
      }

      groupFiles.forEach(this.validateFileCallback(validation));
    };
  }

  private validateFileCallback(validation: MediaCollectionMetadata) {
    return (file: Express.Multer.File) => {
      if (validation.maxSize && file.size > validation.maxSize) {
        throw new PayloadTooLargeException(
          `The file ${file.originalname} exceeded the allowed size limits (${validation.maxSize}B)`,
        );
      }

      if (
        validation.accepteds &&
        !this.validateMimeTypes(file.mimetype, validation.accepteds)
      ) {
        throw new UnsupportedMediaTypeException(
          `${file.originalname} file type is not allowed (accepteds: ${validation.accepteds})`,
        );
      }
    };
  }

  private validateMimeTypes(mimeType: string, accepteds: string[]) {
    if (!accepteds || _.isEmpty(accepteds) || _.isEqual(accepteds, ['*'])) {
      return true;
    }

    const [type, subtype] = mimeType.split('/');

    const validation = accepteds.find((accepted) => {
      const [comparType, comparSubtype] = accepted.split('/');

      if (type === comparType && subtype === comparSubtype) {
        return true;
      }

      if (type === comparType && comparSubtype === '*') {
        return true;
      }

      return false;
    });

    return Boolean(validation);
  }
}
