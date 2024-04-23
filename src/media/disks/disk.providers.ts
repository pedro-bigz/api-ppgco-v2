import { env } from 'process';
import { PpgcoBucket } from './ppgco/ppgco.bucket';
import { BucketCredentials } from './disk.interfaces';

export const DiskProviders = {
  ppgco: {
    factory: (credentials: BucketCredentials) => new PpgcoBucket(credentials),
    credentials: {
      accessKeyId: env.BUCKET_ACCESS_KEY_ID,
      secretAccessKey: env.BUCKET_SECRET_ACCESS_KEY,
    },
    bucketKey: env.BUCKET_KEY,
  },
};
