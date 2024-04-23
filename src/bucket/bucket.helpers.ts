import { Injectable } from '@nestjs/common';
import { storageApi } from '@app/core';
import _trim from 'lodash/trim';

@Injectable()
export class BucketHelpers {
  resolvePathNames(path: string, replaces: Record<string, string>) {
    let pathCopy = path;

    Object.entries(replaces).forEach(([key, value]) => {
      pathCopy = pathCopy.replaceAll(':' + key, value);
    });

    return pathCopy;
  }

  absolutePath(...paths: string[]) {
    const normalizedPath = paths.reduce((accum, path) => {
      return accum + _trim(path, '/');
    }, '');

    return this.getBaseUrl() + '/' + normalizedPath;
  }

  getBaseUrl() {
    return storageApi.getUri();
  }
}
