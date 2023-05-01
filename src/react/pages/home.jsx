import React from 'react';

import './home.scss';

import DialogueWindow from '../organisms/dialogueWindow';
import MiniDialogueWindow from '../organisms/miniDialogueWindow';
import TitleWindow from '../organisms/titleWindow';
import CreditWindow from '../organisms/creditWindow';
import DryadWindow from '../organisms/dryadWindow';
import RecapWindow from '../organisms/recapWindow';
import DaytimeWindow from '../organisms/daytimeWindow';
import Gui from '../organisms/gui';

const Home = () => (
  <div className="home">
    <DialogueWindow />
    <MiniDialogueWindow />
    <TitleWindow />
    <DryadWindow />
    <RecapWindow />
    <DaytimeWindow />
    <CreditWindow />
    <Gui />
  </div>
);

export default Home;
