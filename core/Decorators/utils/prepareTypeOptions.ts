import { ApiResponseType } from '../types';

export const prepareTypeOptions = (type?: ApiResponseType) => {
  return type ? { type } : {};
};
