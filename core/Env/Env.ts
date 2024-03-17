import { env } from 'process';
import { EnvType } from './EnvHelper';

export interface EnvInterface extends EnvType {
  DATABASE_URL: string;
  JWT_SECRET_KEY: string;
  JWT_REFRESH_SECRET_KEY: string;
  PORT: string;
  WEB_SOCKET_ORIGIN: string;
  COMERC_API: string;
  IGREEN_HORSE_API: string;
  WISE_PAY_API: string;
  TOKEN_EMPRESA_WISEPAY: string;
  AWS_S3_URL: string;
  IGREEN_EMAIL: string;
  IGREEN_EMAIL_TOKEN: string;
  COMERC_API_TOKEN: string;
  TOKEN_HORSE_API: string;
}

export const ENV = () => {
  return {
    DATABASE_URL: env.DATABASE_URL || '',
    JWT_SECRET_KEY: env.JWT_SECRET_KEY || '',
    JWT_REFRESH_SECRET_KEY: env.JWT_SECRET_KEY || '',
    PORT: env.PORT || '',
    WEB_SOCKET_ORIGIN: env.WEB_SOCKET_ORIGIN || '',
    COMERC_API: env.COMERC_API || '',
    IGREEN_HORSE_API: env.IGREEN_HORSE_API || '',
    WISE_PAY_API: env.WISE_PAY_API || '',
    TOKEN_EMPRESA_WISEPAY: env.TOKEN_EMPRESA_WISEPAY || '',
    AWS_S3_URL: env.AWS_S3_URL || '',
    IGREEN_EMAIL: env.IGREEN_EMAIL || '',
    IGREEN_EMAIL_TOKEN: env.IGREEN_EMAIL_TOKEN || '',
    COMERC_API_TOKEN: env.COMERC_API_TOKEN || '',
  } as EnvInterface;
};
