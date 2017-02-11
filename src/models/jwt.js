import {decode} from 'jsonwebtoken';
import moment from 'moment';

import AuthenticatedUser from './authenticated_user';


export default class JWT {
  constructor(body, insertedAt, userId, expire) {
    this.body = body;
    this.insertedAt = insertedAt;
    this.userId = userId;
    this.expire = expire;

    const payload = decode(body);

    this.authenticatedUser = new User(payload.username, payload.)
  }
}
