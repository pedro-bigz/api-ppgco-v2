import { FileSystemException } from './file-system.exception';

export class FileQuantityExceededException extends FileSystemException {
  constructor(maxCount: number, description?: string) {
    super(
      `The number of files exceeded the allowed limit (max: ${maxCount})`,
      description,
    );
  }
}
