import React, { useEffect, useRef } from 'react';
import { Application, autoDetectRenderer } from 'pixi.js';
import Loader from '../../pixi/loader';

import GlobalVars from '../../pixi/globalVars';

import Bunny from '../../pixi/props/bunny';

import { useEvent } from '../../providers/Event';

import './stage.scss';

const StageDom = () => {
  const ref = useRef(null);

  const { Event } = useEvent();

  useEffect(() => {
    const app = new Application({
      resizeTo: window,
      backgroundColor: 0x000000,
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

  return <div className="stage" ref={ref} />;
};

export default StageDom;
