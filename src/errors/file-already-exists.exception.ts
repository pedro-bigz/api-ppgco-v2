import { FileSystemException } from './file-system.exception';

export class FileAlreadyExistsException extends FileSystemException {
  private filename: string;

  constructor(filename: string) {
    super(`The file ${filename} already exists`);
    this.filename = filename;
  }

  public getFilename() {
    return this.filename;
  }
}
