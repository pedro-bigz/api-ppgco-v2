export const USER_REPOSITORY = 'USER_REPOSITORY';
export const COLLECTIONS = {
  avatar: {
    maxSize: 100 * 1024 * 1024,
    maxCount: 2,
    required: true,
    accepteds: ['image/*'],
  },
};
