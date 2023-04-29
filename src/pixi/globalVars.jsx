class GlobalVars {
  constructor() {
    this.vars = {
      speed: 1,
    };
  }

  setGlobal({ name, value }) {
    if (name !== undefined && value !== undefined) {
      this.vars[name] = value;
    } else {
      console.error('No name AND value on payload');
      console.info('Name: ', name);
      console.info('Value: ', value);
    }
  }

  getGlobal(name) {
    if (name !== undefined) {
      return this.vars[name];
    }
    console.error('No name');
    console.info('Name: ', name);
    return undefined;
  }
}

export default GlobalVars;
