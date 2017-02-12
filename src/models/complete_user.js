import superagent from 'superagent';

import {convertKeysToSnakeCase, convertKeysToCamelCase} from '../util/case_conversions';
import AuthenticatedUser from './authenticated_user';
import AuthenticationManager from '../managers/authentication_manager';

const URL = {
  getUser: 'http://localhost:4000/api/access_control/users/',
  getPermissionSet: 'http://localhost:4000/api/access_control/authorization/permission_sets/',
};

export default class CompleteUser extends AuthenticatedUser {
  constructor(username, insertedAt, id, email, activationDate, permissionSetId) {
    super(username, insertedAt, id, email);

    this.activationDate = activationDate;
    this.permissionSetId = permissionSetId;
  }

  static async extend(user) {
    const result =
     await superagent
      .get(URL.getUser + user.id)
      .set('Authorization', AuthenticationManager.jwt.headerify())
      .set('Accept', 'application/json');

    const object = result.body.data;
    object.permissionSetId = 1;

    return new CompleteUser(user.username,
                            user.insertedAt,
                            user.id,
                            user.email,
                            null,
                            object.permissionSetId);
  }

  async getPermissionSet() {
    const result =
     await superagent
      .get(URL.getPermissionSet + this.permissionSetId)
      .set('Authorization', AuthenticationManager.jwt.headerify())
      .set('Accept', 'application/json');

    return result.body.data;
  }
}
