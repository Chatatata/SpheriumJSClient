import User from './user';

export default class AuthenticatedUser extends User {
  constructor(username, insertedAt, id, email) {
    super(username, insertedAt, id);

    this.email = email;
  }
}
