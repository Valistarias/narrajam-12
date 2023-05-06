import React, {
  useEffect, useMemo, useState,
} from 'react';

import { useGlobalVars } from '../../providers/GlobalVars';
import { classTrim } from '../../utils';

import './tribeWindow.scss';
import NectarGiveway from '../molecules/nectarGiveway';

const TribeWindow = () => {
  const [visible, setVisible] = useState(false);

  const {
    vars,
    displayedScreen,
    isActualStep,
    tribes,
    giveNectar,
  } = useGlobalVars();

  const tribesDom = useMemo(() => {
    const dom = [];
    Object.keys(tribes).forEach((tribeId) => {
      const {
        name,
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
          <NectarGiveway
            tribe={tribes[tribeId]}
            nectarGiven={0}
            canGiveNectar={vars.nectar > 0}
            onGive={() => { giveNectar(tribeId); }}
          />
        </div>,
      );
    });
    return dom;
  }, [tribes, vars?.nectar, giveNectar]);

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
          Here, you can distribute your Nectar reserves between each of the tribes living in Vedinor. 
          Each unit of Nectar will keep the Ash Plague at bay for a small amount of people. 
          Those infected who did not receive any are likely to die during the night. 
          In exchange for Nectar, the tribes will give you Flowers, and might come to you during the day. 
        </p>
      </div>
      <div className="tribeWindow__tribes">
        {tribesDom}
      </div>
    </div>
  );
};

export default TribeWindow;
