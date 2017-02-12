class Permission {
  constructor(controllerName, controllerAction, id, requiredGrantPower, type) {
    this.controllerName = controllerName;
    this.controllerAction = controllerAction;
    this.id = id;
    this.requiredGrantPower = requiredGrantPower;
    this.type = type;
  }
}

export default Permission;
