import React from 'react';

import './home.scss';

import StageDom from '../organisms/stage';
import DialogueWindow from '../organisms/dialogueWindow';

const Home = () => (
  <div className="home">
    <StageDom />
    <DialogueWindow />
  </div>
);

export default Home;
