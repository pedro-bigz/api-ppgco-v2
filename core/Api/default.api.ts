import axios from 'axios';
import { ENV } from 'core';

const env = ENV();

export const defaultApi = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});
