import React, {
  useEffect, useState,
} from 'react';

import { useGlobalVars } from '../../providers/GlobalVars';
import { classTrim } from '../../utils';

import './recapWindow.scss';

const RecapWindow = () => {
  const [visible, setVisible] = useState(false);

  const {
    displayedScreen, isActualStep,
  } = useGlobalVars();

  useEffect(() => {
    setVisible(displayedScreen === 'game' && isActualStep('recap'));
  }, [
    displayedScreen,
    isActualStep,
  ]);

  return (
    <div className={classTrim(`
      recapWindow
      ${visible ? ' recapWindow--visible' : ''}
    `)}
    >
      <p>Coucou</p>
    </div>
  );
};

export default RecapWindow;
