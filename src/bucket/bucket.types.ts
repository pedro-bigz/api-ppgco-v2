export type BucketData = {
  name: string;
  description: string;
  isPrivate: boolean;
  active: boolean;
};

export type BucketConfig = {
  name?: string;
  key?: string;
};

export type BucketClientConfig = {
  credentials: BucketAuthConfig;
};

export type BucketAuthConfig = {
  accessKeyId: string;
  secretAccessKey: string;
};

export type BucketFileUpload = {
  file: Blob;
  description: string;
  password: string;
  collection_name: string;
};

export type BucketRegister = {
  name: string;
  description: string;
  isPrivate: boolean;
  active: boolean;
};

export type BucketFileRegister = {
  description: string;
  path: string;
  extension: string;
  name: string;
  mimeType: string;
  updatedAt: string;
  createdAt: string;
};
