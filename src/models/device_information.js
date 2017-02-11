import parser from 'ua-parser-js';

export default class DeviceInformation {
  constructor(uuid, userAgent) {
    this.uuid = uuid;
    this.userAgent = parser(userAgent);
  }
}
