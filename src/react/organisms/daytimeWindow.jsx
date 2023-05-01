import React, {
  useEffect, useState,
} from 'react';

import { useGlobalVars } from '../../providers/GlobalVars';
import { classTrim } from '../../utils';

import './daytimeWindow.scss';

const DaytimeWindow = () => {
  const [visible, setVisible] = useState(false);

  const {
    vars, displayedScreen, isActualStep, goToNextBlock,
  } = useGlobalVars();

  console.log('vars', vars);

  useEffect(() => {
    setVisible(displayedScreen === 'game' && isActualStep('main'));
  }, [
    displayedScreen,
    isActualStep,
  ]);

  return (
    <div className={classTrim(`
      daytimeWindow
      ${visible ? ' daytimeWindow--visible' : ''}
    `)}
    >
      {/* <p>Coucou</p> */}
    </div>
  );
};

export default DaytimeWindow;
