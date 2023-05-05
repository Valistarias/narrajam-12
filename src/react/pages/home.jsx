import React from 'react';

import './home.scss';

import MiniDialogueWindow from '../organisms/components/miniDialogueWindow';
import TitleWindow from '../organisms/titleWindow';
import CreditWindow from '../organisms/creditWindow';
import DryadWindow from '../organisms/dryadWindow';
import RecapWindow from '../organisms/recapWindow';
import DaytimeWindow from '../organisms/daytimeWindow';
import Gui from '../organisms/gui';
import HybridationWindow from '../organisms/hybridationWindow';
import TribeWindow from '../organisms/tribeWindow';
import Disclaimer from '../organisms/disclaimer';

const Home = () => (
  <div className="home">
    <Disclaimer />
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
