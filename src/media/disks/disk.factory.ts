import { DiskProviders } from './disk.providers';
import { Disk } from './disk.interfaces';

interface DiskFactoryInterface {
  create(diskName: string): Disk;
}

export const DiskFactory: DiskFactoryInterface = class DiskFactory {
  public static create(diskName: string) {
    const { factory, credentials, bucketKey } = DiskProviders[diskName];
    const instance = factory(credentials);

    return instance.setBucketKey(bucketKey);
  }
};
