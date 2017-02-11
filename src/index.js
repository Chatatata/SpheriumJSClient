import superagent from 'superagent';
import _ from 'lodash';
import uuid from 'uuid';
import jwt from 'jsonwebtoken';
import moment from 'moment';

import Passphrase from './models/passphrase';
import JWT from './models/jwt';
import AuthenticationManager from './managers/authentication_manager';

const URL = {
  submitCredentials: 'http://localhost:4000/api/access_control/authentication',
  submitInsecureAuthenticationHandle: 'http://localhost:4000/api/access_control/authentication',
  renewToken: 'http://localhost:4000/api/access_control/authentication/tokens',
};

/* eslint-disable vars-on-top *//* eslint-disable no-var */
export var globalState = {};

export function convertKeysToCamelCase(object) {
  return _.mapKeys(object, (value, key) => _.camelCase(key));
}

export function convertKeysToSnakeCase(object) {
  return _.mapKeys(object, (value, key) => _.snakeCase(key));
}

/**
 * @param {string} username Represents user's username.
 * @param {string} password Represents user's password.
 * @return {Promise<Object>} An object containing user's preferred authentication scheme,
 *                           a user identifier and possibly a concrete authentication
 *                           middleware.
 */
export async function submitCredentials(username, password) {
  const body = convertKeysToSnakeCase({
    credentials: {
      username,
      password,
    },
  });

  const result =
   await superagent
    .post(URL.submitCredentials)
    .send(body)
    .set('Accept', 'application/json');

  return convertKeysToCamelCase(result.body.data);
}


export async function submitInsecureAuthenticationHandle(passkey) {
  const body = convertKeysToSnakeCase({
    insecureAuthenticationSubmission: {
      passkey,
    },
    deviceInformation: {
      device: uuid.v4(),
      'user_agent': 'Spherium Javascript Client',
    },
  });

  const result =
   await superagent
    .post(URL.submitInsecureAuthenticationHandle)
    .send(body)
    .set('Accept', 'application/json');

  const data = convertKeysToCamelCase(result.body.data);

  return new Passphrase(data.passkey,
                        null,
                        data.userId,
                        data.device,
                        data.userAgent);
}

export async function renewToken(passkey) {
  const body = convertKeysToSnakeCase({
    passkey,
  });

  const result =
   await superagent
    .post(URL.renewToken)
    .send(body)
    .set('Accept', 'application/json');

  const data = convertKeysToCamelCase(result.body.data);

  return new JWT(data.jwt,
                 moment(data.insertedAt).toDate(),
                 data.userId,
                 moment.unix(data.exp).toDate());
}

renewToken('SzMCEEv/SmuPGHeuomOIQEToadQl/kJnlhxn4PaH+9n8l+8mD6RBiZ+UXn+yiQUso9ENJ37RSaSQcq85Tla3lw==')
.then(result => {
  AuthenticationManager.jwt = result;

  return result.user.extend();
})
.then(res => {
  console.log(res.body);
})
