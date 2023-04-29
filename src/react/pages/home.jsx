import React from 'react';

import './home.scss';

import StageDom from '../organisms/stage';
import DialogueWindow from '../organisms/dialogueWindow';

const Home = () => (
  <div className="home">
    <h1> Narrative Game Jam 12 ! </h1>
    <StageDom />
    <DialogueWindow />
  </div>
);

export default Home;
