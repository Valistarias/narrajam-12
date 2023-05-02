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
    { maxRand: 10, flatBonus: 5 },
    { maxRand: 20, flatBonus: 10 },
    { maxRand: 40, flatBonus: 15 },
    { maxRand: 50, flatBonus: 20 },
    { maxRand: 60, flatBonus: 25 },
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

  console.log('tribes', tribes);

  const [hybridationIds, setHybridationIds] = useState([]);

  const [displayedScreen, setDisplayedScreen] = useState('title');

  const screenCycle = useMemo(() => [
    'recap',
    'main',
    'tribe',
    'dryad',
  ], []);

  const totalPop = useMemo(() => {
    let pop = 0;
    Object.keys(tribes).forEach((tribeId) => {
      pop += tribes[tribeId]?.people || 0;
    });
    return pop;
  }, [tribes]);

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

  const deathRatio = useCallback((mortalityRate) => {
    // From 0 to 1, 0 is the full random, and 1 the certainty of death
    const rand = Math.floor(Math.random()) - mortalityRate;
    return (rand < 0 ? 0 : rand) + mortalityRate;
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
        let deathToll = Math.floor(deathRatio(0.7) * next[tribeName].infected);
        if (next[tribeName].people === 1) {
          deathToll = 0;
        }
        let newInfected = Math.floor(Math.random() * infectedDayRatio[nextDay].maxRand)
          + infectedDayRatio[nextDay].flatBonus;
        if (next[tribeName].people === 1) {
          newInfected = 0;
        }
        next[tribeName].deaths += deathToll;
        const tempInfectedCount = next[tribeName].infected + newInfected;
        if (tempInfectedCount > next[tribeName].people) {
          next[tribeName].infected = next[tribeName].people;
          next[tribeName].newInfected = next[tribeName].people - next[tribeName].infected;
        } else {
          next[tribeName].infected = tempInfectedCount - deathToll;
          next[tribeName].newInfected = newInfected;
        }
        next[tribeName].people -= deathToll;
        if (next[tribeName].people <= 0) {
          next[tribeName].people = 1;
        }
        next[tribeName].newDeaths = deathToll;
      });
      return next;
    });
  }, [infectedDayRatio, deathRatio]);

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
    totalPop,
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
    totalPop,
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
    totalPop,
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
    totalPop,
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
