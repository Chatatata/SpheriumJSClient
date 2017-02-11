import {decode} from 'jsonwebtoken';
import moment from 'moment';

import AuthenticatedUser from './authenticated_user';
import DeviceInformation from './device_information';
import InvalidJWTIssuerError from '../errors/invalid_jwt_issuer_error';
import InvalidJWTSubError from '../errors/invalid_jwt_sub_error';

export default class JWT {
  constructor(body, insertedAt, userId, expiration) {
    this.body = body;
    this.insertedAt = insertedAt;
    this.userId = userId;
    this.expiration = expiration;

    const payload = decode(body);

    if (payload.iss !== 'spherium') {
      throw InvalidJWTIssuerError(payload.iss);
    }

    if (payload.sub !== 'access') {
      throw InvalidJWTSubError(payload.sub);
    }

    this.user =
      new AuthenticatedUser(payload.username,
                            moment(payload.created_at).toDate(),
                            payload.id,
                            payload.email);

    this.device =
      new DeviceInformation(payload.device,
                            payload.user_agent);
  }

  headerify() {
    return 'Bearer ' + this.body;
  }
}
