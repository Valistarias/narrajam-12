import React from 'react';

import './home.scss';

import StageDom from '../organisms/stage';
import DialogueWindow from '../organisms/dialogueWindow';
import MiniDialogueWindow from '../organisms/miniDialogueWindow';

const Home = () => (
  <div className="home">
    <StageDom />
    <DialogueWindow />
    <MiniDialogueWindow />
  </div>
);

export default Home;
