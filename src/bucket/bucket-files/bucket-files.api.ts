import { BucketHelpers, BucketHttp } from 'src/bucket';
import { ENDPOINTS } from 'src/bucket';
import { BucketFileRegister } from '../bucket.types';
import path from 'path';

export type BucketFileConfig = {
  file: Express.Multer.File;
  password?: string;
};

export type BucketFileUpload = {
  description?: string;
} & BucketFileConfig;

export interface BucketFileApiInterface {
  uploadFile(
    bucketKey: string,
    uploadConfig: BucketFileUpload,
  ): Promise<BucketFileRegister>;
  getFile(
    bucketKey: string,
    filename: string,
    password?: string,
  ): Promise<Blob>;
}

export class BucketFileApi implements BucketFileApiInterface {
  constructor(
    private http: BucketHttp,
    private helpers: BucketHelpers,
  ) {}

  public async uploadFile(bucketKey: string, uploadConfig: BucketFileUpload) {
    const formData = new FormData();
    const url = this.helpers.resolvePathNames(ENDPOINTS.files.upload, {
      bucketKey,
    });
    const headers = {
      'Content-Type':
        'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
    };

    Object.entries(uploadConfig).forEach(([key, value]) => {
      if (!value) return;
      if (typeof value === 'string') {
        return formData.append(key, value);
      }

      const blob = new Blob([value.buffer], { type: value.mimetype });
      formData.append(key, blob, value.originalname);
    });

    return this.http.instance
      .post(url, formData, { headers })
      .then((response: { data: any }) => response.data)
      .catch(console.log);
  }

  public async deleteFile(
    bucketKey: string,
    filename: string,
    password?: string,
  ) {
    const url = this.helpers.resolvePathNames(ENDPOINTS.files.upload, {
      bucketKey,
      filename,
    });

    return this.http.instance
      .post(url, { password })
      .then((response: { data: any }) => response.data)
      .catch(console.log);
  }

  public async getFile(bucketKey: string, filename: string, password?: string) {
    const url = this.helpers.resolvePathNames(ENDPOINTS.files.get, {
      bucketKey,
      filename,
    });

    return this.http.instance
      .get(url, { data: { password } })
      .then((response: { data: { blob: () => any } }) => response.data.blob());
  }

  public resolveFileUrl(bucketKey: string, filename: string) {
    const suffix = this.helpers.resolvePathNames(ENDPOINTS.files.get, {
      bucketKey,
      filename,
    });

    return path.join(this.http.instance.getUri(), suffix);
  }
}
