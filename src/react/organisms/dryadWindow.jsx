import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';

import { useGlobalVars } from '../../providers/GlobalVars';
import { classTrim } from '../../utils';

import './dryadWindow.scss';
import { useEvent } from '../../providers/Event';

const DryadWindow = () => {
  const [visible, setVisible] = useState(false);

  const { vars, displayedScreen, isActualStep } = useGlobalVars();
  const { Event } = useEvent();

  const dialogByDay = useMemo(() => {
    switch (vars.day) {
      case 0: {
        return 'begining';
      }
      default: {
        console.error('NO DIALOG FOUND ON DAY', vars?.day);
        return null;
      }
    }
  }, [vars?.day]);

  useEffect(() => {
    setVisible(displayedScreen === 'game' && isActualStep('dryad'));
    if (displayedScreen === 'game' && isActualStep('dryad')) {
      Event.dispatchEvent(new CustomEvent('openDialogue', {
        detail: {
          name: dialogByDay,
        },
      }));
    }
  }, [vars?.stepCycle, displayedScreen, isActualStep, dialogByDay, Event]);

  return (
    <div className={classTrim(`
      dryadWindow
      ${visible ? ' dryadWindow--visible' : ''}
    `)}
    >
      <p>Coucou</p>
    </div>
  );
};

export default DryadWindow;
