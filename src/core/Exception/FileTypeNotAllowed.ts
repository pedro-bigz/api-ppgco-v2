import { FileSystemException } from './FileSystemException';

export class FileTypeNotAllowed extends FileSystemException {
  private filename: string;

  constructor(filename: string, accepteds: string[], description?: string) {
    const acceptedsString = accepteds.join(', ');
    super(
      `${filename} file type is not allowed (accepteds: ${acceptedsString})`,
      description,
    );
    this.filename = filename;
  }

  public getFilename() {
    return this.filename;
  }
}
