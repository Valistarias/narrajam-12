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
        deaths,
        infected,
        newInfected,
        newDeaths,
      } = tribes[tribeId];
      dom.push(
        <div
          key={tribeId}
          className={classTrim(`
            recapWindow__tribe
            recapWindow__tribe--${tribeId}
          `)}
        >
          <div className="recapWindow__tribe__logo" />
          <p className="recapWindow__tribe__name">{name}</p>
          <div className="recapWindow__tribe__data">
            <p className="recapWindow__tribe__data__elt">
              <span className="recapWindow__tribe__data__elt__value">
                {`${newInfected > 0 ? '+' : ''}`}
                {newInfected}
                <span className="recapWindow__tribe__data__elt__value__total">
                  (
                  {infected}
                  )
                </span>
              </span>
              <span className="recapWindow__tribe__data__elt__text">Infected</span>
            </p>
            <p className="recapWindow__tribe__data__elt">
              <span className="recapWindow__tribe__data__elt__value">
                {`${newDeaths > 0 ? '+' : ''}`}
                {newDeaths}
                <span className="recapWindow__tribe__data__elt__value__total">
                  (
                  {deaths}
                  )
                </span>
              </span>
              <span className="recapWindow__tribe__data__elt__text">Deaths</span>
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
