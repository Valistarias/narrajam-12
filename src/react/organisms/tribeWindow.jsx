import React, {
  useEffect, useMemo, useState,
} from 'react';

import { useGlobalVars } from '../../providers/GlobalVars';
import { classTrim } from '../../utils';

import './tribeWindow.scss';

const TribeWindow = () => {
  const [visible, setVisible] = useState(false);

  const {
    displayedScreen, isActualStep, tribes,
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
            tribeWindow__tribe
            tribeWindow__tribe--${tribeId}
          `)}
        >
          <h3 className="tribeWindow__tribe__name">{name}</h3>
        </div>,
      );
    });
    return dom;
  }, [tribes]);

  useEffect(() => {
    setVisible(displayedScreen === 'game' && isActualStep('tribe'));
  }, [
    displayedScreen,
    isActualStep,
  ]);

  return (
    <div
      className={classTrim(`
        tribeWindow
        ${visible ? ' tribeWindow--visible' : ''}
      `)}
    >
      <div
        className="tribeWindow__title"
      >
        <div className="tribeWindow__title__block">
          <h2 className="tribeWindow__title__content">Tribe council</h2>
        </div>
        <p className="tribeWindow__title__text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Sed tempor consectetur nibh, quis lacinia quam ornare nec.
          Vestibulum interdum vitae erat eget bibendum.
          Praesent cursus convallis lectus sit amet euismod.
          Cras ipsum lectus, dapibus a tincidunt sit amet, blandit sit amet sem.
        </p>
      </div>
      <div className="tribeWindow__tribes">
        {tribesDom}
      </div>
    </div>
  );
};

export default TribeWindow;
