import React, {
  useCallback,
  useEffect, useMemo, useState,
} from 'react';

import { useGlobalVars } from '../../providers/GlobalVars';
import { classTrim } from '../../utils';

import './dryadWindow.scss';
import { useEvent } from '../../providers/Event';

const DryadWindow = () => {
  const [visible, setVisible] = useState(false);
  const [dispatchedEvent, setDispatchedEvent] = useState(false);

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
      setDispatchedEvent(false);
      Event.dispatchEvent(new CustomEvent('openDialogue', {
        detail: {
          name: dialogByDay,
        },
      }));
    }
  }, [
    vars?.stepCycle,
    displayedScreen,
    isActualStep,
    dialogByDay,
    Event,
    goToNextDay,
  ]);

  const onGoToNextDay = useCallback(() => {
    if (!dispatchedEvent) {
      goToNextDay();
      setDispatchedEvent(true);
    }
  }, [goToNextDay, dispatchedEvent]);

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
