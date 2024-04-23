import _flatten from 'lodash/flatten';
import _chunk from 'lodash/chunk';

export const chunkingPromises = async <T = any>(
  arr: Promise<T>[],
  size: number = 5,
) => {
  const groups = _chunk(arr, size);
  const resolved: Array<Array<T>> = [];

  for (const group of groups) {
    resolved.push(await Promise.all<T>(group));
  }

  return _flatten(resolved);
};
