import React, {
  useCallback,
  useEffect, useMemo, useRef, useState,
} from 'react';

import { useGlobalVars } from '../../providers/GlobalVars';
import { classTrim } from '../../utils';

import './dryadWindow.scss';
import { useEvent } from '../../providers/Event';
import { useMusic } from '../../providers/Music';

const DryadWindow = () => {
  const [visible, setVisible] = useState(false);
  const dispatchedEvent = useRef(false);

  const { switchMusic } = useMusic();

  const {
    vars, displayedScreen, isActualStep, goToNextDay,
  } = useGlobalVars();

  const { Event } = useEvent();

  const dialogByDay = useMemo(() => {
    if (!isActualStep('dryad')) { return null; }
    switch (vars.day) {
      case 0: {
        return 'begining';
      }
      case 1: {
        return 'begining';
      }
      case 2: {
        return 'FirstNightDialog';
      }
      case 3: {
        return 'FirstNightDialog';
      }
      case 4: {
        return 'FirstNightDialog';
      }
      case 5: {
        return 'FirstNightDialog';
      }
      default: {
        console.error('NO DIALOG FOUND ON DAY', vars?.day);
        return null;
      }
    }
  }, [vars?.day, isActualStep]);

  useEffect(() => {
    setVisible(displayedScreen === 'game' && isActualStep('dryad'));
    if (displayedScreen === 'game' && isActualStep('dryad')) {
      dispatchedEvent.current = false;
      Event.dispatchEvent(new CustomEvent('openDialogue', {
        detail: {
          name: dialogByDay,
        },
      }));
      switchMusic('dryad');
    }
  }, [
    vars?.stepCycle,
    displayedScreen,
    isActualStep,
    dialogByDay,
    Event,
    goToNextDay,
    switchMusic,
  ]);

  const onGoToNextDay = useCallback(() => {
    if (!dispatchedEvent.current) {
      goToNextDay();
      dispatchedEvent.current = true;
      switchMusic('main');
    }
  }, [goToNextDay, switchMusic]);

  useEffect(() => {
    Event.addEventListener('closeDialogue', () => {
      onGoToNextDay();
    });
  }, [Event, onGoToNextDay]);

  return (
    <div className={classTrim(`
      dryadWindow
      ${visible ? ' dryadWindow--visible' : ''}
    `)}
    />
  );
};

export default DryadWindow;
