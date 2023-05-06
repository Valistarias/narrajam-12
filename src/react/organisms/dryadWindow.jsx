import React, {
  useCallback,
  useEffect, useMemo, useRef, useState,
} from 'react';

import { MouseParallaxContainer, MouseParallaxChild } from 'react-parallax-mouse';

import { useEvent } from '../../providers/Event';
import { useMusic } from '../../providers/Music';
import { useGlobalVars } from '../../providers/GlobalVars';
import { classTrim } from '../../utils';

// import DryadBG from '../../assets/imgs/dryad-bg.jpg';
import DryadFG from '../../assets/imgs/dryad-fg.png';
import DryadTable from '../../assets/imgs/dryad-table.png';

import DialogueWindow from './components/dialogueWindow';

import './dryadWindow.scss';

const DryadWindow = () => {
  const [visible, setVisible] = useState(false);
  const [selectedDialog, setSelectedDialog] = useState(null);

  const ending = useRef();

  const { switchMusic, day, night } = useMusic();

  const {
    vars, displayedScreen, isActualStep, goToNextDay, income,
  } = useGlobalVars();

  const { Event } = useEvent();

  const dialogByDay = useMemo(() => {
    if (!isActualStep('dryad')) { return null; }
    switch (vars.day) {
      case 0: {
        return 'FirstNightDialog';
      }
      case 1: {
        return 'SecondNightDialog';
      }
      case 2: {
        if (income._dryad >= income._tribe) {
          // Dialog dryad
          return 'ThirdNightDryadDialog';
        }
        // Dialog tribe
        return 'ThirdNightTribeDialog';
      }
      case 3: {
        return 'FourthNightDialog';
      }
      case 4: {
        if (income._dryad >= income._tribe) {
          ending.current = 'dryad';
          // Dialog dryad
          return 'FifthNightDryadDialog';
        }
        ending.current = 'tribe';
        // Dialog tribe
        return 'FifthNightTribeDialog';
      }
      case 5: {
        if (ending.current === 'dryad') {
          // Dialog dryad
          return 'SixthNightDryadDialog';
        }
        // Dialog tribe
        return 'SixthNightTribeDialog';
      }
      default: {
        console.error('NO DIALOG FOUND ON DAY', vars?.day);
        return null;
      }
    }
  }, [vars?.day, isActualStep, income?._dryad, income?._tribe]);

  // const testDialogByDay = useMemo(() => {
  //   if (!isActualStep('dryad')) { return null; }
  //   switch (vars.day) {
  //     case 0: {
  //       return 'begining';
  //     }
  //     case 1: {
  //       return 'begining';
  //     }
  //     case 2: {
  //       if (income._dryad >= income._tribe) {
  //         // Dialog dryad
  //         return 'begining';
  //       }
  //       // Dialog tribe
  //       return 'begining';
  //     }
  //     case 3: {
  //       return 'begining';
  //     }
  //     case 4: {
  //       return 'begining';
  //     }
  //     case 5: {
  //       return 'begining';
  //     }
  //     default: {
  //       console.error('NO DIALOG FOUND ON DAY', vars?.day);
  //       return null;
  //     }
  //   }
  // }, [vars?.day, isActualStep, income?._dryad, income?._tribe]);

  useEffect(() => {
    setVisible(displayedScreen === 'game' && isActualStep('dryad'));
    if (displayedScreen === 'game' && isActualStep('dryad')) {
      setSelectedDialog(dialogByDay);
      night();
      switchMusic('dryad');
    }
  }, [
    vars?.stepCycle,
    displayedScreen,
    isActualStep,
    dialogByDay,
    Event,
    goToNextDay,
    switchMusic,
    night,
  ]);

  const onCloseDialog = useCallback(() => {
    goToNextDay();
    switchMusic('main');
    day();
    setSelectedDialog(null);
  }, [day, goToNextDay, switchMusic]);

  return (
    <div className={classTrim(`
      dryadWindow
      ${visible ? ' dryadWindow--visible' : ''}
    `)}
    >
      <MouseParallaxContainer className="dryadWindow__dryad" globalFactorX={0.1} globalFactorY={0.1}>
        <MouseParallaxChild className="dryadWindow__dryad__bg" factorX={0.1} factorY={0.1}>
          {/* <img height="100%" className="dryadWindow__dryad__bg__img" src={DryadBG} alt="" /> */}
          <div className="dryadWindow__dryad__bg__img" />
        </MouseParallaxChild>
        <MouseParallaxChild className="dryadWindow__dryad__table" factorX={0.1} factorY={0.1}>
          <img src={DryadTable} alt="" />
        </MouseParallaxChild>
        <MouseParallaxChild className="dryadWindow__dryad__fg" factorX={0.3} factorY={0.3}>
          <img src={DryadFG} alt="" />
        </MouseParallaxChild>
      </MouseParallaxContainer>
      <DialogueWindow
        onCloseDialog={onCloseDialog}
        selectedDialog={selectedDialog}
      />
    </div>
  );
};

export default DryadWindow;
