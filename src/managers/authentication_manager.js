class AuthenticationManager {
  constructor(jwt = null) {
    this.jwt = jwt;
  }
}

export default new AuthenticationManager();
