import { FileSystemException } from './FileSystemException';

export class RequiredFileException extends FileSystemException {
  private filename: string;

  constructor(filename: string, description?: string) {
    super(`The files ${filename} are required`, description);
    this.filename = filename;
  }

  public getFilename() {
    return this.filename;
  }
}
