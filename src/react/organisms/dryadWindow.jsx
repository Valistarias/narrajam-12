import React, {
  useCallback,
  useEffect, useMemo, useState,
} from 'react';

import { useGlobalVars } from '../../providers/GlobalVars';
import { classTrim } from '../../utils';

import './dryadWindow.scss';
import { useEvent } from '../../providers/Event';
import { useMusic } from '../../providers/Music';
import DialogueWindow from './components/dialogueWindow';

const DryadWindow = () => {
  const [visible, setVisible] = useState(false);
  const [selectedDialog, setSelectedDialog] = useState(null);

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
          // Dialog dryad
          return 'FifthNightDryadDialog';
        }
        // Dialog tribe
        return 'FifthNightTribeDialog';
      }
      case 5: {
        if (income._dryad >= income._tribe) {
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

  const testDialogByDay = useMemo(() => {
    if (!isActualStep('dryad')) { return null; }
    switch (vars.day) {
      case 0: {
        return 'begining';
      }
      case 1: {
        return 'begining';
      }
      case 2: {
        if (income._dryad >= income._tribe) {
          // Dialog dryad
          return 'begining';
        }
        // Dialog tribe
        return 'begining';
      }
      case 3: {
        return 'begining';
      }
      case 4: {
        return 'begining';
      }
      case 5: {
        return 'begining';
      }
      default: {
        console.error('NO DIALOG FOUND ON DAY', vars?.day);
        return null;
      }
    }
  }, [vars?.day, isActualStep, income?._dryad, income?._tribe]);

  useEffect(() => {
    setVisible(displayedScreen === 'game' && isActualStep('dryad'));
    if (displayedScreen === 'game' && isActualStep('dryad')) {
      setSelectedDialog(testDialogByDay);
      night();
      switchMusic('dryad');
    }
  }, [
    vars?.stepCycle,
    displayedScreen,
    isActualStep,
    testDialogByDay,
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
      <DialogueWindow
        onCloseDialog={onCloseDialog}
        selectedDialog={selectedDialog}
      />
    </div>
  );
};

export default DryadWindow;
