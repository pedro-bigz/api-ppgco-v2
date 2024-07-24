import { SystemApliance } from './entities';
import { SYSTEM_APLIANCES_REPOSITORY } from './system-apliances.constants';

export const systemApliancesProviders = [
  {
    provide: SYSTEM_APLIANCES_REPOSITORY,
    useValue: SystemApliance,
  },
];
