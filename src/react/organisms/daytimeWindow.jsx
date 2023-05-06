import React, {
  useEffect, useMemo, useState,
} from 'react';

import { useGlobalVars } from '../../providers/GlobalVars';
import { classTrim } from '../../utils';

import './daytimeWindow.scss';
import { useEvent } from '../../providers/Event';

const DaytimeWindow = () => {
  const [visible, setVisible] = useState(false);
  const [dispatchedEvent, setDispatchedEvent] = useState(false);

  const {
    vars,
    displayedScreen,
    isActualStep,
    removeEventFromQueue,
  } = useGlobalVars();

  const { Event } = useEvent();

  const time = useMemo(() => {
    if (!vars?.timeBlock) { return null; }

    switch (vars.timeBlock) {
      case 3: return 'morning';
      case 2: return 'day';
      default: return 'evening';
    }
  }, [vars?.timeBlock]);

  useEffect(() => {
    setVisible(displayedScreen === 'game' && isActualStep('main'));
  }, [
    displayedScreen,
    isActualStep,
  ]);

  useEffect(() => {
    if (displayedScreen === 'game' && isActualStep('main') && !dispatchedEvent) {
      removeEventFromQueue((id) => {
        if (id) {
          Event.dispatchEvent(new CustomEvent('openMiniDialogue', {
            detail: {
              name: id,
            },
          }));
        }
      });
      setDispatchedEvent(true);
    }
  }, [
    Event,
    removeEventFromQueue,
    vars?.day,
    vars?.timeBlock,
    displayedScreen,
    isActualStep,
    dispatchedEvent,
  ]);

  useEffect(() => {
    setDispatchedEvent(false);
  }, [
    vars?.day,
    vars?.timeBlock,
  ]);

  return (
    <div className={classTrim(`
      daytimeWindow
      ${visible ? ' daytimeWindow--visible' : ''}
      daytimeWindow--${time}
    `)}
    >
      <div className="daytimeWindow__day daytimeWindow__day--morning" />
      <div className="daytimeWindow__day daytimeWindow__day--day" />
      <div className="daytimeWindow__day daytimeWindow__day--evening" />
    </div>
  );
};

export default DaytimeWindow;
