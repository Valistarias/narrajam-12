import React from 'react';

import './home.scss';

import DialogueWindow from '../organisms/components/dialogueWindow';
import MiniDialogueWindow from '../organisms/components/miniDialogueWindow';
import TitleWindow from '../organisms/titleWindow';
import CreditWindow from '../organisms/creditWindow';
import DryadWindow from '../organisms/dryadWindow';
import RecapWindow from '../organisms/recapWindow';
import DaytimeWindow from '../organisms/daytimeWindow';
import Gui from '../organisms/gui';
import HybridationWindow from '../organisms/hybridationWindow';
import TribeWindow from '../organisms/tribeWindow';

const Home = () => (
  <div className="home">
    <DialogueWindow />
    <MiniDialogueWindow />
    <TitleWindow />
    <DryadWindow />
    <RecapWindow />
    <DaytimeWindow />
    <HybridationWindow />
    <TribeWindow />
    <CreditWindow />
    <Gui />
  </div>
);

export default Home;
