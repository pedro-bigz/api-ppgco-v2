import { ApiResponseType } from '../types';

export const getResponseType = (
  options: any,
  defaultType?: ApiResponseType,
) => {
  return options?.type ?? defaultType;
};
