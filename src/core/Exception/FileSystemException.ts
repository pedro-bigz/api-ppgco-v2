import { Logger } from '@nestjs/common';
import { CustomError } from './CustomError';

export class FileSystemException extends CustomError {
  private description?: string;

  constructor(message: string, description?: string) {
    super(message);
    this.description = description;
  }

  public log() {
    Logger.error('[ALREADY EXISTS] ' + this.message);
  }

  public getDescription() {
    return this.description;
  }
}
