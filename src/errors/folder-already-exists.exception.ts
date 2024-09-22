import { FileSystemException } from './file-system.exception';

export class FolderAlreadyExistsException extends FileSystemException {
  private filename: string;

  constructor(filename: string) {
    super(`The folder ${filename} already exists`);
    this.filename = filename;
  }

  public getFilename() {
    return this.filename;
  }
}
