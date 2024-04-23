import {
  BucketApi,
  BucketApiInterface,
  BucketAuth,
  BucketHelpers,
  BucketHttp,
  REMOTE_BUCKET,
} from '@app/bucket';
import {
  BucketFileApi,
  BucketFileApiInterface,
} from '@app/bucket/bucket-files';
import { BucketClientConfig } from './bucket.types';
import { MagicMethods } from '@app/core';

interface BucketClientInterface {
  bucket: BucketApi;
  files: BucketFileApi;
}

@MagicMethods
export class BucketClient implements BucketClientInterface {
  private auth: BucketAuth;
  private http: BucketHttp;
  private bucketApi: BucketApi;
  private filesApi: BucketFileApi;
  private helpers: BucketHelpers;

  private static instance: BucketClient;

  private constructor(private config: BucketClientConfig) {
    this.init();
  }

  public static getInstance(config?: BucketClientConfig) {
    if (!this.instance) {
      if (!config) {
        throw new Error('Bucket client config is required');
      }

      this.instance = new BucketClient(config);
    }

    return this.instance;
  }

  public init() {
    console.log('initing bucket');
    this.helpers = new BucketHelpers();
    this.http = new BucketHttp(REMOTE_BUCKET);

    this.auth = new BucketAuth(this.http, this.config.credentials);
    this.bucketApi = new BucketApi(this.http, this.helpers);
    this.filesApi = new BucketFileApi(this.http, this.helpers);
  }

  public get bucket() {
    return this.bucketApi;
  }

  public get files() {
    return this.filesApi;
  }

  public get baseUrl() {
    return this.http.instance.getUri();
  }
}
