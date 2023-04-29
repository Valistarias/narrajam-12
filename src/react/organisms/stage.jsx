import React, { useEffect, useRef } from 'react';
import { Application } from 'pixi.js';
import Loader from '../../pixi/loader';
import Bunny from '../../pixi/props/bunny';
import { useEvent } from '../../providers/Event';
import GlobalVars from '../../pixi/globalVars';

const StageDom = () => {
  const ref = useRef(null);

  const { Event } = useEvent();

  useEffect(() => {
    const app = new Application({
      width: 800,
      height: 600,
      backgroundColor: 0x5BBA6F,
    });
    ref.current.appendChild(app.view);
    app.start();

    const vars = new GlobalVars();

    async function assetLoad() {
      const textures = await Loader();
      const bunny = new Bunny({
        app,
        texture:
        textures.bunnyBundle.bunny,
        evt: Event,
        vars,
      });
    }
    assetLoad();

    return () => {
      app.destroy(true, true);
    };
  }, [Event]);

  return <div ref={ref} />;
};

export default StageDom;
