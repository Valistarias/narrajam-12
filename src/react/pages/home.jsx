import React from 'react';

import './home.scss';

import DialogueWindow from '../organisms/dialogueWindow';
import MiniDialogueWindow from '../organisms/miniDialogueWindow';
import TitleWindow from '../organisms/titleWindow';

const Home = () => (
  <div className="home">
    <DialogueWindow />
    <MiniDialogueWindow />
    <TitleWindow />
  </div>
);

export default Home;
