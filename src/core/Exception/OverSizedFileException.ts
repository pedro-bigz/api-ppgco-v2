import { FileSystemException } from './FileSystemException';

export class OverSizedFileException extends FileSystemException {
  private filename: string;

  constructor(filename: string, maxSize: number, description?: string) {
    super(
      `The file ${filename} exceeded the allowed size limits (${maxSize}B)`,
      description,
    );
    this.filename = filename;
  }

  public getFilename() {
    return this.filename;
  }
}
