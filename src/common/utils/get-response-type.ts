import { ApiResponseType } from '../types/swagger-safe.types';

export const getResponseType = (
  options: any,
  defaultType?: ApiResponseType,
) => {
  return options?.type ?? defaultType;
};
