import axios, {
  AxiosInstance,
  AxiosInterceptorOptions,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from 'axios';

export interface BucketHttpInterface {
  setRequestInterceptors: <V = InternalAxiosRequestConfig<any>>(
    onFulfilled?: ((value: V) => V | Promise<V>) | null,
    onRejected?: ((error: any) => any) | null,
    options?: AxiosInterceptorOptions,
  ) => number;
  setResponseInterceptors: <V = InternalAxiosRequestConfig<any>>(
    onFulfilled?: ((value: V) => V | Promise<V>) | null,
    onRejected?: ((error: any) => any) | null,
    options?: AxiosInterceptorOptions,
  ) => number;
  instance: AxiosInstance;
  authInstance: AxiosInstance;
}

export class BucketHttp implements BucketHttpInterface {
  protected axiosInstance: AxiosInstance;
  protected axiosAuthIntance: AxiosInstance;
  protected config: CreateAxiosDefaults<any> | undefined;

  constructor(config?: CreateAxiosDefaults) {
    this.config = config;
    this.axiosInstance = axios.create(config);
    this.axiosAuthIntance = axios.create(config);
  }

  public setRequestInterceptors(...args: any[]) {
    return this.axiosInstance.interceptors.request.use(...args);
  }

  public setResponseInterceptors(...args: any[]) {
    return this.axiosInstance.interceptors.response.use(...args);
  }

  public get instance() {
    return this.axiosInstance;
  }

  public get authInstance() {
    return this.axiosAuthIntance;
  }
}
