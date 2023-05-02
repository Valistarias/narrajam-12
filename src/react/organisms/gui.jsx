import React, {
  useEffect, useMemo, useState,
} from 'react';

import { useGlobalVars } from '../../providers/GlobalVars';
import { capitalize, classTrim } from '../../utils';

import './gui.scss';

const Gui = () => {
  const [timebarVisible, setTimebarVisible] = useState(false);

  const {
    vars,
    displayedScreen,
    isActualStep,
  } = useGlobalVars();

  const blockToPeriod = useMemo(() => {
    switch (vars?.timeBlock) {
      case 1: {
        return 'day';
      }
      case 2: {
        return 'evening';
      }
      default: {
        return 'morning';
      }
    }
  }, [vars?.timeBlock]);

  useEffect(() => {
    setTimebarVisible(displayedScreen === 'game' && isActualStep('main'));
  }, [
    displayedScreen,
    isActualStep,
  ]);

  return (
    <div className={classTrim(`
      gui
      gui--${blockToPeriod}
    `)}
    >
      <div className={classTrim(`
            gui__timebar-block
            ${timebarVisible ? ' gui__timebar-block--visible' : ''}
          `)}
      >
        <div
          className={classTrim(`
            gui__timebar
            ${timebarVisible ? ' gui__timebar--visible' : ''}
          `)}
        >
          <div className="gui__timebar__fg">
            <div className="gui__timebar__fg__morning" />
            <div className="gui__timebar__fg__day" />
            <div className="gui__timebar__fg__evening" />
          </div>
          <div className="gui__timebar__bg">
            <div className="gui__timebar__bg__morning" />
            <div className="gui__timebar__bg__day" />
            <div className="gui__timebar__bg__evening" />
          </div>
        </div>
        <div className="gui__timeInfo">
          <p className="gui__timeInfo__name">
            {capitalize(blockToPeriod)}
          </p>
          <p className="gui__timeInfo__day">
            Day
            {' '}
            {vars.day}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Gui;
