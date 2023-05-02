import React, {
  useState, useMemo, useContext, useCallback,
} from 'react';
import PropTypes from 'prop-types';

import Hybridations from '../assets/data/hybridations';

const GlobalVarsContext = React.createContext();

export const GlobalVarsProvider = ({ children }) => {
  const [vars, setVars] = useState({
    nectar: 2,
    flower: 2,
    timeBlock: 3,
    day: 0,
    stepCycle: 3,
    dryadTier: 0,
    tribeTier: 0,
  });

  const [income, setIncome] = useState({
    nectar: 0,
    flower: 0,
    _tribe: 0,
    _dryad: 0,
  });

  const [hybridationResearch, setHybridationResearch] = useState(null);

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

  const totalInfected = useMemo(() => {
    let inf = 0;
    Object.keys(tribes).forEach((tribeId) => {
      inf += tribes[tribeId]?.infected || 0;
    });
    return inf;
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
        const next = [...prev];
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
      setVars((prev) => {
        const next = { ...prev };
        if (Hybridations[id].side === 'neutral') {
          next.dryadTier = 1;
          next.tribeTier = 1;
        }
        if (Hybridations[id].side === 'tribe') {
          next.tribeTier = Hybridations[id].tier + 1;
        }
        if (JSON.stringify(prev) === JSON.stringify(next)) {
          return prev;
        }
        return next;
      });
    } else {
      console.error('Hybridation unknown :', id);
    }
  }, []);

  const researchHybridation = useCallback((id) => {
    if (Hybridations[id]) {
      setVars((prev) => {
        const next = { ...prev };
        next.flower -= Hybridations[id].flowerCost;
        return next;
      });
      if (Hybridations[id].duration === 0) {
        addHybridation(id);
      } else {
        setHybridationResearch({
          id,
          time: Hybridations[id].duration,
        });
      }
    } else {
      console.error('Hybridation unknown :', id);
    }
  }, [addHybridation]);

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
      next.timeBlock = 3;
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
    if (hybridationResearch) {
      if (hybridationResearch.time === 1) {
        addHybridation(hybridationResearch.id);
        setHybridationResearch(null);
      } else {
        setHybridationResearch((prev) => {
          const next = { ...prev };
          next.time -= 1;
          return next;
        });
      }
    }
    if (vars.timeBlock === 1) {
      goToNextCycle();
    } else {
      setVars((prev) => {
        const next = { ...prev };
        next.timeBlock -= 1;
        return next;
      });
    }
  }, [vars?.timeBlock, goToNextCycle, addHybridation, hybridationResearch]);

  const providerValues = useMemo(() => ({
    vars,
    income,
    tribes,
    totalPop,
    totalInfected,
    hybridationResearch,
    hybridationIds,
    displayedScreen,
    updateVar,
    researchHybridation,
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
    totalInfected,
    hybridationResearch,
    hybridationIds,
    displayedScreen,
    updateVar,
    researchHybridation,
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
    totalInfected,
    hybridationResearch,
    hybridationIds,
    displayedScreen,
    updateVar,
    researchHybridation,
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
    totalInfected,
    hybridationResearch,
    hybridationIds,
    displayedScreen,
    updateVar,
    researchHybridation,
    setDisplayedScreen,
    isActualStep,
    goToNextDay,
    goToNextCycle,
    goToNextBlock,
  };
};
