export enum Cover {
  LOGIN = 'login_page_image',
  RESET_PASSWORD = 'reset_password_page_image',
  FORGOT_PASSWORD = 'forgot_password_page_image',
}

export const COLLECTIONS = {
  covers: {
    maxSize: 100 * 1024 * 1024,
    maxCount: 2,
    required: false,
    accepteds: ['image/*'],
  },
  login_cover: {
    maxSize: 100 * 1024 * 1024,
    maxCount: 2,
    required: false,
    accepteds: ['image/*'],
  },
  reset_password_cover: {
    maxSize: 100 * 1024 * 1024,
    maxCount: 2,
    required: false,
    accepteds: ['image/*'],
  },
  forgot_password_cover: {
    maxSize: 100 * 1024 * 1024,
    maxCount: 2,
    required: false,
    accepteds: ['image/*'],
  },
};
