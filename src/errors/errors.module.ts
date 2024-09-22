import { Module } from '@nestjs/common';
import { CustomError } from './custom.error';
import { FileAlreadyExistsException } from './file-already-exists.exception';
import { FileQuantityExceededException } from './file-quantity-exceeded.exception';
import { FileSystemException } from './file-system.exception';
import { FileTypeNotAllowedException } from './file-type-not-allowed.exception';
import { FolderAlreadyExistsException } from './folder-already-exists.exception';
import { NotFoundException } from './not-found.exception';
import { OverSizedFileException } from './over-sized-file.exception';
import { RequiredFileException } from './required-file.exception';

@Module({
  providers: [
    CustomError,
    FileAlreadyExistsException,
    FileQuantityExceededException,
    FileSystemException,
    FileTypeNotAllowedException,
    FolderAlreadyExistsException,
    NotFoundException,
    OverSizedFileException,
    RequiredFileException,
  ],
  exports: [
    CustomError,
    FileAlreadyExistsException,
    FileQuantityExceededException,
    FileSystemException,
    FileTypeNotAllowedException,
    FolderAlreadyExistsException,
    NotFoundException,
    OverSizedFileException,
    RequiredFileException,
  ],
})
export class ErrorsModule {}
