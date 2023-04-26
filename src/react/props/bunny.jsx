import React, { useState } from 'react';
import { Sprite, useTick } from '@pixi/react';

import bunny from '../../assets/imgs/bunny.png';

let i = 0;

const Bunny = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useTick((delta) => {
    i += 0.05 * delta;
    setX((Math.sin(i) * 100) + 150);
    setY((Math.sin(i / 1.5) * 100) + 150);
  });

  return (
    <Sprite
      image={bunny}
      x={x}
      y={y}
      anchor={0.5}
      scale={1.3}
    />
  );
};

export default Bunny;
