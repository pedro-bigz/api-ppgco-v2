import { ENDPOINTS } from './bucket.constants';
import { BucketHelpers } from './bucket.helpers';
import { BucketHttp } from './bucket.http';
import { BucketRegister } from './bucket.types';

export type BucketConfig = {
  name: string;
  description?: string;
  isPrivate: boolean;
  active: boolean;
};

export interface BucketApiInterface {
  createBucket(bucketConfig: BucketConfig): Promise<BucketRegister>;
  updateBucket(
    bucketKey: string,
    bucketConfig: BucketConfig,
  ): Promise<[affectedCount: number]>;
}

export class BucketApi implements BucketApiInterface {
  constructor(
    private http: BucketHttp,
    private helpers: BucketHelpers,
  ) {}

  public async createBucket(bucketConfig: BucketConfig) {
    return this.http.instance
      .post(ENDPOINTS.bucket.create, bucketConfig)
      .then((response: { data: any }) => response.data);
  }

  public async updateBucket(bucketKey: string, bucketConfig: BucketConfig) {
    const url = this.helpers.resolvePathNames(ENDPOINTS.bucket.update, {
      bucketKey,
    });
    return this.http.instance
      .post(url, bucketConfig)
      .then((response) => response.data);
  }
}
