import { ENDPOINTS } from './bucket.constants';
import { AxiosRequestConfig } from 'axios';
import { BucketAuthConfig } from './bucket.types';
import { BucketHttp } from './bucket.http';

export class BucketAuth {
  private accessToken: string;
  private refreshToken: string;

  constructor(
    private http: BucketHttp,
    private authConfig: BucketAuthConfig,
  ) {
    this.init();
  }

  private init() {
    const configCb = async (config: AxiosRequestConfig) => {
      const response = new Promise<AxiosRequestConfig>((resolve) => {
        this.ensureAuthentication()
          .then(() => resolve(this.configRequestHeaders(config)))
          .catch(() => resolve(config));
      });

      return response;
    };
    this.http.setRequestInterceptors(configCb);
  }

  private setToken(accessToken: string) {
    this.accessToken = accessToken;
  }

  private setRefreshToken(accessToken: string) {
    this.refreshToken = accessToken;
  }

  public getAccessToken() {
    return this.accessToken;
  }

  public getRefreshToken() {
    return this.refreshToken;
  }

  public getBearerToken() {
    return `Bearer ${this.accessToken}`;
  }

  public getBearerRefreshToken() {
    return `Bearer ${this.refreshToken}`;
  }

  public async authenticate() {
    return new Promise((resolve, reject) => {
      this.http.authInstance
        .post(ENDPOINTS.auth.login, this.authConfig)
        .then(({ data: { auth } }) => {
          this.setToken(auth.accessToken);
          this.setRefreshToken(auth.refreshToken);

          resolve(auth);
        })
        .catch(reject);
    });
  }

  public async isValidToken() {
    return new Promise<{ hasAccess: Boolean }>((resolve, reject) => {
      this.http.authInstance
        .head(ENDPOINTS.auth.check)
        .then(() => resolve({ hasAccess: true }))
        .catch(reject);
    });
  }

  public async ensureAuthentication() {
    return new Promise((resolve, reject) => {
      this.isValidToken()
        .then(resolve)
        .catch(() => this.authenticate().then(resolve).catch(reject));
    });
  }

  public setRequestAuthHeader<D = any>(config?: AxiosRequestConfig<D>) {
    return {
      ...config?.headers,
      Authorization: this.getBearerToken(),
    };
  }

  public configRequestHeaders<D = any>(
    config?: AxiosRequestConfig<D>,
  ): AxiosRequestConfig<D> {
    return {
      ...config,
      headers: this.setRequestAuthHeader<D>(config),
    };
  }

  public auth() {
    return {
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
    };
  }
}
