class PermissionSet {
  constructor(name, id, grantPower, description, permissions, authorityId) {
    this.name = name;
    this.id = id;
    this.grantPower = grantPower;
    this.description = description;
    this.permissions = permissions;
    this.authorityId = authorityId;
  }
}

export default PermissionSet;
