import React from 'react';

import './home.scss';

import DialogueWindow from '../organisms/dialogueWindow';
import MiniDialogueWindow from '../organisms/miniDialogueWindow';
import TitleWindow from '../organisms/titleWindow';
import CreditWindow from '../organisms/creditWindow';
import DryadWindow from '../organisms/dryadWindow';

const Home = () => (
  <div className="home">
    <DialogueWindow />
    <MiniDialogueWindow />
    <TitleWindow />
    <DryadWindow />
    <CreditWindow />
  </div>
);

export default Home;
