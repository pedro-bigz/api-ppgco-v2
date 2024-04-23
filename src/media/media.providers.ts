import { Media } from './entities';
import { MEDIA_REPOSITORY } from './media.constants';

export const mediaProviders = [
  {
    provide: MEDIA_REPOSITORY,
    useValue: Media,
  },
];
