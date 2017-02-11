import superagent from 'superagent';
import _ from 'lodash';

const URL = 'http://localhost:4000/api/access_control/authentication';

export function convertKeysToCamelCase(object) {
  return _.mapKeys(object, (value, key) => _.camelCase(key));
}

/**
 * @param {string} username Represents user's username.
 * @param {string} password Represents user's password.
 * @return {Promise<Object>} An object containing user's preferred authentication scheme,
 *                           a user identifier and possibly a concrete authentication
 *                           middleware.
 */
export async function submitCredentials(username, password) {
  const body = {
    credentials: {
      username,
      password,
    },
  };

  return await superagent
    .post(URL)
    .send(body)
    .set('Accept', 'application/json')
    .then(response => {
      return convertKeysToCamelCase(response.body.data);
    });
}
