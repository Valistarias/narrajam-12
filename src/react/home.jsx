import React, { useMemo } from 'react';

import './home.scss';
import {
  Container,
  Sprite,
  Stage,
  Text,
} from '@pixi/react';
import { BlurFilter } from 'pixi.js';

import bunny from '../assets/imgs/bunny.png';

const Home = () => {
  const blurFilter = useMemo(() => new BlurFilter(4), []);
  return (
    <div className="home">
      <h1> Narrative Game Jam 12 ! </h1>
      <img
        src={bunny}
        alt="ok"
      />
      <Stage>
        <Sprite
          image={bunny}
          x={400}
          y={270}
          anchor={{ x: 0.5, y: 0.5 }}
        />

        <Container x={400} y={330}>
          <Text text="Hello World" anchor={{ x: 0.5, y: 0.5 }} filters={[blurFilter]} />
        </Container>
      </Stage>
    </div>
  );
};

export default Home;
