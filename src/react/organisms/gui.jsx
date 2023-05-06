import React, {
  useCallback,
  useEffect, useMemo, useState,
} from 'react';

import { useGlobalVars } from '../../providers/GlobalVars';
import { capitalize, classTrim } from '../../utils';

import './gui.scss';
import RessourceBlock from './components/ressourceBlock';
import Button from '../molecules/button';
import { useMusic } from '../../providers/Music';

const Gui = () => {
  const [timebarVisible, setTimebarVisible] = useState(false);
  const [ressourcesVisible, setRessourcesVisible] = useState(false);
  const [nextperiodVisible, setNextPeriodVisible] = useState(false);

  const [hybridationVisible, setHybridationVisible] = useState(false);

  const [canModifyHybridation, setCanModifyHybridation] = useState(true);
  const [canGoNextPeriod, setCanGoNextPeriod] = useState(true);

  const [hybridDone, setHybridDone] = useState(true);

  const {
    vars,
    income,
    totalInfected,
    updateVar,
    displayedScreen,
    isActualStep,
    totalPop,
    goToNextBlock,
    hybridationIds,
  } = useGlobalVars();

  const onTreeClick = useCallback(() => {
    setHybridDone(false);
    updateVar({
      name: 'DISPLAY_HYBRIDATION',
      value: !hybridationVisible,
    });
  }, [updateVar, hybridationVisible]);

  const blockToPeriod = useMemo(() => {
    if (isActualStep('tribe')) {
      return 'night';
    }
    switch (vars?.timeBlock) {
      case 2: {
        return 'day';
      }
      case 1: {
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
      case 2: {
        return 'next period (Evening)';
      }
      case 1: {
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
    if (displayedScreen === 'game' && !isActualStep('main')) {
      setCanModifyHybridation(false);
    } else {
      setCanModifyHybridation(true);
    }
    setRessourcesVisible(displayMainGui);
    setNextPeriodVisible(displayMainGui);
  }, [
    displayedScreen,
    isActualStep,
  ]);

  useEffect(() => {
    setHybridDone(true);
  }, [hybridationIds]);

  useEffect(() => {
    setHybridationVisible(!!vars.DISPLAY_HYBRIDATION);
  }, [vars?.DISPLAY_HYBRIDATION]);

  useEffect(() => {
    setCanModifyHybridation(!vars.DISPLAY_MINI_DIALOG);
    setCanGoNextPeriod(!vars.DISPLAY_MINI_DIALOG);
  }, [vars?.DISPLAY_MINI_DIALOG]);

  return (
    <div
      className={classTrim(`
        gui
        gui--${blockToPeriod}
      `)}
    >
      <div
        className={classTrim(`
          gui__title-hybridation
          ${hybridationVisible ? ' gui__title-hybridation--visible' : ''}
        `)}
      >
        <div className="gui__title-hybridation__block">
          <h2 className="gui__title-hybridation__content">Hybridation tree</h2>
        </div>
        <p className="gui__title-hybridation__text">
          In this screen, you can pick new hybridations for the Dryad. 
          By feeding her Flowers, you can increase the quantity of Nectar 
          and Flowers she'll produce at the start of each new day. 
          Hybridations cost Flowers and take some time to finish. They impact 
          the Dryad in more than one way, be careful which one you pick...
        </p>
      </div>
      <div
        className={classTrim(`
          gui__ressource-block
          ${ressourcesVisible ? ' gui__ressource-block--visible' : ''}
          ${hybridDone && ressourcesVisible ? ' gui__ressource-block--hybridDone' : ''}
        `)}
      >
        <Button
          icon="leaf"
          theme="icon"
          className="gui__ressource-block__tree-button"
          onClick={onTreeClick}
          disabled={!canModifyHybridation}
        >
          {
            hybridationVisible
              ? 'Go back'
              : 'Tree'
          }
        </Button>
        <RessourceBlock
          text="Population"
          logo="people"
          value={totalPop}
          parenthesis={`${totalInfected} sick`}
        />
        <RessourceBlock
          text="Flowers"
          logo="flower"
          value={vars.flower}
          parenthesis={`+${income.flower}`}
        />
        <RessourceBlock
          text="Nectar"
          logo="nectar"
          value={vars.nectar}
          parenthesis={`+${income.nectar}`}
        />
      </div>
      <div
        className={classTrim(`
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
          ${nextperiodVisible && !hybridationVisible ? ' gui__next-period--visible' : ''}
        `)}
        onClick={() => {
          goToNextBlock();
        }}
        disabled={!canGoNextPeriod || hybridationVisible}
      >
        Go to
        {' '}
        {nextPeriod}
      </Button>
    </div>
  );
};

export default Gui;
