class PixiProp {
  constructor({
    app,
    texture,
    evt,
    vars,
  }) {
    this.app = app;
    this.texture = texture;
    this._eventSystem = evt;
    this.vars = vars;
  }

  setGlobal({ name, value }) {
    if (name && value) {
      this.app.globalVars[name] = value;
    } else {
      console.error('No name AND value on payload');
      console.info('Prop: ', this);
      console.info('Prop: ', this);
    }
  }

  sentEvent({ type, payload }) {
    this._eventSystem.dispatchEvent(new CustomEvent(type, {
      detail: payload,
    }));
  }

  onEvent(type, payload) {
    console.log('Event sent.');
    console.log('Type: ', type);
    console.log('Payload: ', payload);
    console.log('Context: ', this);
  }

  subscribeToEvents({ types }) {
    if (types.length > 0) {
      types.forEach((type) => {
        this._eventSystem.addEventListener(type, (payload) => {
          this.onEvent(type, payload);
        });
      });
    }
  }
}

export default PixiProp;
