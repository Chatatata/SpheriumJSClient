import ExtendableError from '../util/extendable_error';

export default class InvalidJWTSubError extends ExtendableError {
  constructor(sub) {
    super(`invalid subsidiary action "${sub}", expected to see "access"`);

    this.sub = sub;
  }
}
