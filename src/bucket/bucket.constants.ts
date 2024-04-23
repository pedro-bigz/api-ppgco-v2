export const ENDPOINTS = {
  auth: {
    login: '/auth/login',
    check: '/auth/check-token',
  },
  bucket: {
    create: 'buckets',
    update: ':bucketKey',
  },
  files: {
    get: 'files/path/:bucketKey/:filename',
    upload: 'files/upload/:bucketKey',
    delete: 'files/delete/:bucketKey/:filename',
  },
};
export const REMOTE_BUCKET = {
  baseURL: 'http://localhost:4001',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
};
