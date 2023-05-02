import React, {
  useEffect, useMemo, useState,
} from 'react';

import { useGlobalVars } from '../../providers/GlobalVars';
import { capitalize, classTrim } from '../../utils';

import './gui.scss';
import RessourceBlock from './components/ressourceBlock';
import Button from '../molecules/button';

const Gui = () => {
  const [timebarVisible, setTimebarVisible] = useState(false);
  const [ressourcesVisible, setRessourcesVisible] = useState(false);
  const [nextperiodVisible, setNextPeriodVisible] = useState(false);

  const [canModifyHybridation, setCanModifyHybridation] = useState(false);
  const [canGoNextPeriod, setCanGoNextPeriod] = useState(true);

  const {
    vars,
    displayedScreen,
    isActualStep,
    totalPop,
    goToNextBlock,
  } = useGlobalVars();

  const blockToPeriod = useMemo(() => {
    if (isActualStep('tribe')) {
      return 'night';
    }
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
  }, [vars?.timeBlock, isActualStep]);

  const nextPeriod = useMemo(() => {
    if (isActualStep('tribe')) {
      return 'The Dryad';
    }
    switch (vars?.timeBlock) {
      case 1: {
        return 'next period (Evening)';
      }
      case 2: {
        return 'Tribe Concil';
      }
      default: {
        return 'next period (Day)';
      }
    }
  }, [vars?.timeBlock, isActualStep]);

  useEffect(() => {
    const displayMainGui = displayedScreen === 'game' && (
      isActualStep('main')
      || isActualStep('tribe')
    );
    setTimebarVisible(displayMainGui);
    setRessourcesVisible(displayMainGui);
    setNextPeriodVisible(displayMainGui);
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
      <div
        className={classTrim(`
          gui__ressource-block
          ${ressourcesVisible ? ' gui__ressource-block--visible' : ''}
        `)}
      >
        <Button
          icon="leaf"
          theme="icon"
          className="gui__ressource-block__tree-button"
          onClick={() => {
            console.log('goto tree');
          }}
          disabled={!canModifyHybridation}
        >
          Tree
        </Button>
        <RessourceBlock
          text="Population"
          logo="people"
          value={totalPop}
        />
        <RessourceBlock
          text="Flowers"
          logo="flower"
          value={vars.flower}
        />
        <RessourceBlock
          text="Nectar"
          logo="nectar"
          value={vars.nectar}
        />
      </div>
      <div className={classTrim(`
            gui__timebar-block
            ${timebarVisible ? ' gui__timebar-block--visible' : ''}
          `)}
      >
        <div
          className="gui__timebar"
        >
          <div className="gui__timebar__fg">
            <div className="gui__timebar__fg__morning" />
            <div className="gui__timebar__fg__day" />
            <div className="gui__timebar__fg__evening" />
            <div className="gui__timebar__fg__night" />
          </div>
          <div className="gui__timebar__bg">
            <div className="gui__timebar__bg__morning" />
            <div className="gui__timebar__bg__day" />
            <div className="gui__timebar__bg__evening" />
            <div className="gui__timebar__bg__night" />
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
      <Button
        theme="icon"
        className={classTrim(`
          gui__next-period
          ${nextperiodVisible ? ' gui__next-period--visible' : ''}
        `)}
        onClick={() => {
          goToNextBlock();
        }}
        disabled={!canGoNextPeriod}
      >
        Go to
        {' '}
        {nextPeriod}
      </Button>
    </div>
  );
};

export default Gui;
