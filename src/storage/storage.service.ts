import { Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { storageApi } from 'core';
import {
  CREATE_BUCKET_PATH,
  GET_FILE_PATH,
  UPLOAD_PATH,
} from './storage.contants';
import path from 'path';

@Injectable()
export class StorageService {
  private api: AxiosInstance;
  public constructor() {
    this.api = storageApi;
  }

  public async createBucket(bucketName: string, bucketDescription: string) {
    const data = {
      name: bucketName,
      description: bucketDescription,
      is_private: true,
      active: true,
    };

    return this.api
      .post(CREATE_BUCKET_PATH, data)
      .then(console.log)
      .catch(console.log);
  }

  public sendFile(bucketKey: string, file: Buffer, metadata: any = {}) {
    const data = new FormData();

    data.set('file', new Blob([file]));
    metadata.entries().forEach(([key, value]) => {
      data.set(key, value);
    });

    this.api
      .post(path.join(UPLOAD_PATH, bucketKey), data)
      .then(console.log)
      .catch(console.log);
  }

  public getFile(bucketKey: string, filename: string, password?: string) {
    const options = {
      params: { filename },
      data: { password },
    };

    this.api
      .get(path.join(GET_FILE_PATH, bucketKey), options)
      .then(console.log)
      .catch(console.log);
  }
}
