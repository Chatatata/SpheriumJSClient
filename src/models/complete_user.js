import superagent from 'superagent';

import AuthenticatedUser from './authenticated_user';

class CompleteUser extends AuthenticatedUser {
  constructor(username, insertedAt, id, email, activationDate, permissionSetId) {
    super(username, insertedAt, id, email);

    this.activationDate = activationDate;
    this.permissionSetId = permissionSetId;
  }

  async getPermissionSet() {
  }
}

export default CompleteUser;
