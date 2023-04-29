import { Sprite } from 'pixi.js';
import PixiProp from './prop';

class Bunny extends PixiProp {
  constructor(props) {
    super(props);

    this.sprite = new Sprite(this.texture);

    this.sprite.interactive = true;
    this.sprite.x = this.app.renderer.width / 2;
    this.sprite.y = this.app.renderer.height / 2;
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;

    this.app.stage.addChild(this.sprite);

    this.subscribeToEvents({ types: ['test'] });

    this.sprite.onclick = () => {
      this.sentEvent({ type: 'openDialogue', payload: { id: 1 } });
    };

    this.app.ticker.add(() => {
      // each frame we spin the this.sprite around a bit
      this.sprite.rotation += 0.01;
    });
  }

  onEvent(type) {
    if (type === 'test') {
      this.sprite.tint = 0xFF0000;
    }
  }
}

export default Bunny;
