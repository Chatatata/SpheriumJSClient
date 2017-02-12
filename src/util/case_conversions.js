import _ from 'lodash';

export function convertKeysToCamelCase(object) {
  return _.mapKeys(object, (value, key) => _.camelCase(key));
}

export function convertKeysToSnakeCase(object) {
  return _.mapKeys(object, (value, key) => _.snakeCase(key));
}
