import { tab } from 'src/core';

export function makeTabs(length: number) {
  return Array(length)
    .map(() => tab)
    .join('');
}
