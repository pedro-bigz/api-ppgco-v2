import _snakeCase from 'lodash/snakeCase';

export const formatCourseName = (name: string) => {
  return _snakeCase(name.normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
};
