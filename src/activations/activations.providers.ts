import { ACTIVATIONS_REPOSITORY } from './activations.constants';
import { Activation } from './entities';

export const activationsProviders = [
  {
    provide: ACTIVATIONS_REPOSITORY,
    useValue: Activation,
  },
];
