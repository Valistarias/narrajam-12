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
    timeBlock: 0,
    day: 0,
    stepCycle: 3,
  });

  const [income, setIncome] = useState({
    nectar: 0,
    flower: 0,
    _tribe: 0,
    _dryad: 0,
  });

  const infectedDayRatio = useMemo(() => [
    { maxRand: 0, flatBonus: 0 },
    { maxRand: 5, flatBonus: 1 },
    { maxRand: 10, flatBonus: 5 },
    { maxRand: 15, flatBonus: 7 },
    { maxRand: 20, flatBonus: 10 },
    { maxRand: 30, flatBonus: 15 },
  ], []);

  const [tribes, setTribes] = useState({
    trunk: {
      name: 'Trunk',
      infected: 5,
      newInfected: 0,
      deaths: 0,
      newDeaths: 0,
      people: 70,
    },
    leaves: {
      name: 'Leaves',
      infected: 5,
      newInfected: 0,
      deaths: 0,
      newDeaths: 0,
      people: 70,
    },
    branches: {
      name: 'Branches',
      infected: 5,
      newInfected: 0,
      deaths: 0,
      newDeaths: 0,
      people: 70,
    },
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
    let nextDay;
    setVars((prev) => {
      const next = { ...prev };
      next.day += 1;
      nextDay = next.day;
      next.stepCycle = 0;
      next.timeBlock = 0;
      return next;
    });
    setTribes((prev) => {
      const next = { ...prev };

      Object.keys(next).forEach((tribeName) => {
        let deathToll = Math.floor(Math.random() * next[tribeName].infected);
        if (next[tribeName].people === 1) {
          deathToll = 0;
        }
        let newInfected = Math.floor(Math.random() * infectedDayRatio[nextDay].maxRand)
          + infectedDayRatio[nextDay].flatBonus;
        if (next[tribeName].people === 1) {
          newInfected = 0;
        }
        next[tribeName].deaths += deathToll;
        next[tribeName].infected = next[tribeName].infected - deathToll + newInfected;
        next[tribeName].people -= deathToll;
        if (next[tribeName].people <= 0) {
          next[tribeName].people = 1;
        }
        next[tribeName].newInfected = newInfected;
        next[tribeName].newDeaths = deathToll;
      });
      return next;
    });
  }, [infectedDayRatio]);

  const goToNextCycle = useCallback(() => {
    setVars((prev) => {
      const next = { ...prev };
      next.stepCycle += 1;
      return next;
    });
  }, []);

  const goToNextBlock = useCallback(() => {
    if (vars.timeBlock === 2) {
      goToNextCycle();
    } else {
      setVars((prev) => {
        const next = { ...prev };
        next.timeBlock += 1;
        return next;
      });
    }
  }, [vars?.timeBlock, goToNextCycle]);

  const providerValues = useMemo(() => ({
    vars,
    income,
    tribes,
    hybridationIds,
    displayedScreen,
    updateVar,
    addHybridation,
    setDisplayedScreen,
    isActualStep,
    goToNextDay,
    goToNextCycle,
    goToNextBlock,
  }), [
    vars,
    income,
    tribes,
    hybridationIds,
    displayedScreen,
    updateVar,
    addHybridation,
    isActualStep,
    goToNextDay,
    goToNextCycle,
    goToNextBlock,
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
    tribes,
    hybridationIds,
    displayedScreen,
    updateVar,
    addHybridation,
    setDisplayedScreen,
    isActualStep,
    goToNextDay,
    goToNextCycle,
    goToNextBlock,
  } = useContext(GlobalVarsContext);

  return {
    vars,
    income,
    tribes,
    hybridationIds,
    displayedScreen,
    updateVar,
    addHybridation,
    setDisplayedScreen,
    isActualStep,
    goToNextDay,
    goToNextCycle,
    goToNextBlock,
  };
};
