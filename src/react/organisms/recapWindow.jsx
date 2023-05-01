import React, {
  useEffect, useMemo, useState,
} from 'react';

import { useGlobalVars } from '../../providers/GlobalVars';
import { classTrim } from '../../utils';

import './recapWindow.scss';
import Button from '../molecules/button';

const RecapWindow = () => {
  const [visible, setVisible] = useState(false);
  const [displayRecaps, setDisplayRecaps] = useState(false);

  const {
    vars, displayedScreen, isActualStep, tribes, goToNextCycle,
  } = useGlobalVars();

  const tribesDom = useMemo(() => {
    const dom = [];
    Object.keys(tribes).forEach((tribeId) => {
      const {
        name,
        newInfected,
        newDeaths,
      } = tribes[tribeId];
      dom.push(
        <div key={tribeId} className="recapWindow__tribe">
          <div className="recapWindow__tribe__logo" />
          <p className="recapWindow__tribe__name">{name}</p>
          <div className="recapWindow__tribe__data">
            <p className="recapWindow__tribe__data__elt">
              <span className="recapWindow__tribe__data__elt__value">{newInfected}</span>
              <span className="recapWindow__tribe__data__elt__text">got infected</span>
            </p>
            <p className="recapWindow__tribe__data__elt">
              <span className="recapWindow__tribe__data__elt__value">{newDeaths}</span>
              <span className="recapWindow__tribe__data__elt__text">deaths</span>
            </p>
          </div>
        </div>,
      );
    });
    return dom;
  }, [tribes]);

  const subTitleByDay = useMemo(() => {
    switch (vars.day) {
      case 1: {
        return 'The Plague struck the tribes tonight. Some didn\'t make it, but Vedinor stand.';
      }
      case 2: {
        return 'Tonight, the Ash Plague took its toll once more. We shall mourn the departed.';
      }
      case 3: {
        return 'The Plague dealt the tribes a cruel blow this day. Too many were lost.';
      }
      case 4: {
        return 'Tonight, the Ash Plague was merciless. So many died while the moon glowed, how many more will tomorrow?';
      }
      case 5: {
        return 'The Plague has killed so many tonight. We shall never survive this.';
      }
      default: {
        return 'What a strange day it is...';
      }
    }
  }, [vars?.day]);

  useEffect(() => {
    setVisible(displayedScreen === 'game' && isActualStep('recap'));
    if (isActualStep('recap')) {
      setTimeout(() => {
        setDisplayRecaps(true);
      }, '1500');
    } else {
      setDisplayRecaps(false);
    }
  }, [
    displayedScreen,
    isActualStep,
  ]);

  return (
    <div className={classTrim(`
      recapWindow
      ${visible ? ' recapWindow--visible' : ''}
      ${displayRecaps ? ' recapWindow--displayRecaps' : ''}
    `)}
    >
      <div className="recapWindow__main">
        <div className="recapWindow__main__block">
          <h2 className="recapWindow__main__day">
            Day
            {' '}
            {vars.day}
          </h2>
          <div className="recapWindow__main__content">
            <div className="recapWindow__title-block">
              <h3 className="recapWindow__title">
                Status Report
              </h3>
              <p className="recapWindow__sub">{subTitleByDay}</p>
            </div>
            <div className="recapWindow__main__content__tribes">
              {tribesDom}
            </div>
          </div>
        </div>
        <div className="recapWindow__main__button">
          <Button
            onClick={() => {
              goToNextCycle();
            }}
            theme="title"
            disabled={!displayRecaps}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecapWindow;
