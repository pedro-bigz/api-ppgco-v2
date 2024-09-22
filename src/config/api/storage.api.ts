import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';

export const storageApi = axios.create({
  baseURL: 'http://localhost:4001',
  headers: {
    'Content-Type': 'application/json',
  },
});

@Injectable()
export class StorageApi {
  public readonly api: AxiosInstance;

  constructor() {
    this.api = storageApi;
  }
}
