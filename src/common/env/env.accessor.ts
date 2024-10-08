import * as dotenv from 'dotenv';

export type EnvType = { [k: string]: string | undefined };

export class EnvAccessor {
  constructor(protected env: EnvType) {
    dotenv.config();
  }

  get(key: string, defaultVal: string | undefined = undefined) {
    return this.getValue(key, defaultVal, false);
  }

  protected getValue(
    key: string,
    defaultVal: string | undefined = undefined,
    throwOnMissing: boolean = true,
  ): string | undefined {
    const value = this.env[key];

    if (!value && !defaultVal && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value || defaultVal;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k));
    return this;
  }

  public getPort(defaultVal: string | undefined = undefined) {
    return +this.getValue('PORT', defaultVal)!;
  }

  public isProduction() {
    const mode = this.getValue('NODE_ENV', '');
    return mode === 'production';
  }
}

export const configHelper = new EnvAccessor(process.env);
