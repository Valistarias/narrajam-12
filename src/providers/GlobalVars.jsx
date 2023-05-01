import React, {
  useState, useMemo, useContext, useCallback,
} from 'react';
import PropTypes from 'prop-types';

import Hybridations from '../assets/data/hybridations';

const GlobalVarsContext = React.createContext();

export const GlobalVarsProvider = ({ children }) => {
  const [vars, setVars] = useState({
    nectar: 0,
    flower: 0,
    day: 0,
    stepCycle: 3,
  });

  const [income, setIncome] = useState({
    nectar: 0,
    flower: 0,
    _tribe: 0,
    _dryad: 0,
  });

  const [hybridationIds, setHybridationIds] = useState([]);

  const [displayedScreen, setDisplayedScreen] = useState('title');

  const screenCycle = useMemo(() => [
    'recap',
    'main',
    'tribe',
    'dryad',
  ], []);

  const isActualStep = useCallback((targetedCycle) => {
    const index = screenCycle.findIndex((cycle) => cycle === targetedCycle);
    return index === vars.stepCycle;
  }, [screenCycle, vars]);

  const updateVar = useCallback(({ name, value }) => {
    setVars((prev) => {
      const next = { ...prev };
      next[name] = value;
      if (JSON.stringify(prev) === JSON.stringify(next)) {
        return prev;
      }
      return next;
    });
  }, []);

  const addHybridation = useCallback((id) => {
    if (Hybridations[id]) {
      setHybridationIds((prev) => {
        const next = { ...prev };
        next.push(id);
        return next;
      });
      setIncome((prev) => {
        const next = { ...prev };
        next.nectar += Hybridations[id].nectarUpg;
        next.flower += Hybridations[id].flowerUpg;
        next._dryad += Hybridations[id].side === 'dryad' ? 1 : 0;
        next._tribe += Hybridations[id].side === 'tribe' ? 1 : 0;
        return next;
      });
    } else {
      console.error('Hybridation unknowm :', id);
    }
  }, []);

  const goToNextDay = useCallback(() => {
    setVars((prev) => {
      const next = { ...prev };
      next.day += 1;
      next.stepCycle = 0;
      return next;
    });
  }, []);

  const goToNextCycle = useCallback(() => {
    setVars((prev) => {
      const next = { ...prev };
      next.stepCycle += 1;
      return next;
    });
  }, []);

  const providerValues = useMemo(() => ({
    vars,
    income,
    hybridationIds,
    displayedScreen,
    updateVar,
    addHybridation,
    setDisplayedScreen,
    isActualStep,
    goToNextDay,
    goToNextCycle,
  }), [
    vars,
    income,
    hybridationIds,
    displayedScreen,
    updateVar,
    addHybridation,
    isActualStep,
    goToNextDay,
    goToNextCycle,
  ]);

  return (
    <GlobalVarsContext.Provider value={providerValues}>
      {children}
    </GlobalVarsContext.Provider>
  );
};

GlobalVarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useGlobalVars = () => {
  const {
    vars,
    income,
    hybridationIds,
    displayedScreen,
    updateVar,
    addHybridation,
    setDisplayedScreen,
    isActualStep,
    goToNextDay,
    goToNextCycle,
  } = useContext(GlobalVarsContext);

  return {
    vars,
    income,
    hybridationIds,
    displayedScreen,
    updateVar,
    addHybridation,
    setDisplayedScreen,
    isActualStep,
    goToNextDay,
    goToNextCycle,
  };
};
