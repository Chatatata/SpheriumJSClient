export default class Passphrase {
  constructor(passkey, insertedAt, userId, device, userAgent) {
    this.passkey = passkey;
    this.insertedAt = insertedAt;
    this.userId = userId;
    this.device = device;
    this.userAgent = userAgent;
  }
}
