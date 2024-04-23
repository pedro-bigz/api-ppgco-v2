import { BucketFileUpload } from '@app/bucket/bucket.types';
import { DiskFactory } from '../disks/disk.factory';
import { Disk } from '../disks/disk.interfaces';

export class MediaStorage {
  private disk: Disk;

  constructor(disk: string) {
    this.disk = DiskFactory.create(disk);
  }

  public getDisk() {
    return this.disk;
  }
}
