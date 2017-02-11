import ExtendableError from '../util/extendable_error';

export default class InvalidJWTIssuerError extends ExtendableError {
  constructor(issuer) {
    super(`recieved insecure issuer "${issuer}" instead of "spherium"`);

    this.issuer = issuer;
  }
}
