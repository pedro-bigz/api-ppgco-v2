import { Module } from '@nestjs/common';
import { BucketApi } from './bucket.api';
import { BucketHttp } from './bucket.http';
import { BucketAuth } from './bucket.auth';
import { BucketHelpers } from './bucket.helpers';

@Module({
  providers: [BucketApi, BucketAuth, BucketHelpers, BucketHttp],
  exports: [BucketApi, BucketAuth, BucketHelpers, BucketHttp],
})
export class BucketModule {}
