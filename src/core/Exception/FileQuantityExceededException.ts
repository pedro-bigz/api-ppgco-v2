import { FileSystemException } from './FileSystemException';

export class FileQuantityExceededException extends FileSystemException {
  constructor(maxCount: number, description?: string) {
    super(
      `The number of files exceeded the allowed limit (max: ${maxCount})`,
      description,
    );
  }
}
