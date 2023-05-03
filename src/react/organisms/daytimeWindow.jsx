import React, {
  useEffect, useState,
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

  useEffect(() => {
    setVisible(displayedScreen === 'game' && isActualStep('main'));
  }, [
    displayedScreen,
    isActualStep,
  ]);

  useEffect(() => {
    if (displayedScreen === 'game' && isActualStep('main') && !dispatchedEvent) {
      removeEventFromQueue((id) => {
        Event.dispatchEvent(new CustomEvent('openMiniDialogue', {
          detail: {
            name: id,
          },
        }));
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
    `)}
    >
      {/* <p>Coucou</p> */}
    </div>
  );
};

export default DaytimeWindow;
