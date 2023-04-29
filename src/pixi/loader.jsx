import { Assets } from 'pixi.js';

import bunnyImg from '../assets/imgs/bunny.png';

const Loader = async () => {
  const manifest = {
    bundles: [
      {
        name: 'bunny',
        assets: [
          {
            name: 'bunny',
            srcs: bunnyImg,
          },
        ],
      },
    ],
  };
  await Assets.init({ manifest });

  const bunnyBundle = await Assets.loadBundle('bunny');
  return {
    bunnyBundle,
  };
};

export default Loader;
