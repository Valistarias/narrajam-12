import React from 'react';
import {
  Stage,
} from '@pixi/react';

import './home.scss';

import Bunny from './props/bunny';

const Home = () => (
  <div className="home">
    <h1> Narrative Game Jam 12 ! </h1>
    <Stage
      options={{
        antialias: true,
      }}
    >
      <Bunny />
    </Stage>
  </div>
);

export default Home;
