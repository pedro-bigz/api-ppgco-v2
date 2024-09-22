import { ApiResponseType } from '../types/swagger-safe.types';

export const prepareTypeOptions = (type?: ApiResponseType) => {
  return type ? { type } : {};
};
