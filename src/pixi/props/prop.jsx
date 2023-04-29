class PixiProp {
  constructor({
    app,
    texture,
    evt,
  }) {
    this.app = app;
    this.texture = texture;
    this._eventSystem = evt;
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
