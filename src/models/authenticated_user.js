import superagent from 'superagent';

import User from './user';
import AuthenticationManager from '../managers/authentication_manager';

const URL = 'http://localhost:4000/api/access_control/users/';

export default class AuthenticatedUser extends User {
  constructor(username, insertedAt, id, email) {
    super(username, insertedAt, id);

    this.email = email;
  }

  async extend() {
    let result =
     await superagent
      .get(URL + this.id)
      .set('Authorization', AuthenticationManager.jwt.headerify())
      .set('Accept', 'application/json');

    return result;
  }
}
