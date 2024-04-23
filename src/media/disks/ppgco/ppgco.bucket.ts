import { BucketClient, BucketConfig } from '@app/bucket';
import { BucketCredentials, Disk } from '../disk.interfaces';
import { BucketFileUpload } from '@app/bucket/bucket-files';
import path from 'path';

export class PpgcoBucket implements Disk {
  private bucketClient: BucketClient;
  private bucketKey: string;
  private metadata: any;

  constructor(credentials: BucketCredentials) {
    this.bucketClient = BucketClient.getInstance({ credentials });
  }

  public async createBucket(bucketConfig: BucketConfig) {
    const { bucketKey, ...metadata } =
      await this.bucketClient.bucket.createBucket(bucketConfig);

    this.bucketKey = bucketKey;
    this.metadata = metadata;
  }

  public async updateBucket(bucketConfig: BucketConfig) {
    return this.bucketClient.bucket.updateBucket(this.bucketKey, bucketConfig);
  }

  public uploadFile(
    file: Express.Multer.File,
    password?: string,
    description?: string,
  ) {
    return this.bucketClient.files.uploadFile(this.bucketKey, {
      file,
      description,
      password,
    });
  }

  public deleteFile(filename: string, password?: string) {
    return this.bucketClient.files.deleteFile(
      this.bucketKey,
      filename,
      password,
    );
  }

  public getFile(filename: string, password?: string) {
    return this.bucketClient.files.getFile(this.bucketKey, filename, password);
  }

  public mountUrl(filename: string) {
    return this.bucketClient.files.resolveFileUrl(this.bucketKey, filename);
  }

  public setBucketKey(bucketKey: string) {
    this.bucketKey = bucketKey;
    return this;
  }

  public getBucketKey() {
    return this.bucketKey;
  }

  public getMetadata() {
    return this.metadata;
  }
}
