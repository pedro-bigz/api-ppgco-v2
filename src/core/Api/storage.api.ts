import axios from 'axios';
import { ENV } from 'src/core';

const env = ENV();

export const storageApi = axios.create({
  baseURL: 'http://localhost:4001',
  headers: {
    'Content-Type': 'application/json',
  },
});
