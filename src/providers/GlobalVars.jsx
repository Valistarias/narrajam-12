import React, {
  useState, useMemo, useContext, useCallback,
} from 'react';
import PropTypes from 'prop-types';

import NarrativeEvents from '../assets/data/narrativeEvents';
import Hybridations from '../assets/data/hybridations';
import { nectarToFlower } from '../utils';

const GlobalVarsContext = React.createContext();

export const GlobalVarsProvider = ({ children }) => {
  // Numeral values
  const [vars, setVars] = useState({
    nectar: 1,
    flower: 1,
    timeBlock: 3,
    day: 0,
    stepCycle: 3,
    dryadTier: 1,
    tribeTier: 1,
    usedNectar: 0,
  });

  const [income, setIncome] = useState({
    nectar: 1,
    flower: 1,
    _tribe: 0,
    _dryad: 0,
  });

  // Infected ratio handling
  const infectedDayRatio = useMemo(() => [
    { maxRand: 0, flatBonus: 0 },
    { maxRand: 10, flatBonus: 5 },
    // { maxRand: 50, flatBonus: 20 },
    { maxRand: 20, flatBonus: 10 },
    { maxRand: 40, flatBonus: 15 },
    { maxRand: 50, flatBonus: 20 },
    { maxRand: 60, flatBonus: 25 },
  ], []);

  // Tribes handling
  const [tribes, setTribes] = useState({
    trunk: {
      name: 'Trunk',
      infected: 30,
      newInfected: 0,
      deaths: 0,
      newDeaths: 0,
      people: 70,
      nectar: 0,
    },
    leaves: {
      name: 'Leaves',
      infected: 30,
      newInfected: 0,
      deaths: 0,
      newDeaths: 0,
      people: 70,
      nectar: 0,
    },
    branches: {
      name: 'Branches',
      infected: 30,
      newInfected: 0,
      deaths: 0,
      newDeaths: 0,
      people: 70,
      nectar: 0,
    },
  });

  // Hybridations handling
  const [hybridationResearch, setHybridationResearch] = useState(null);
  const [hybridationIds, setHybridationIds] = useState(['valerian']);

  // Events handling
  const [, setEventQueueId] = useState([
    'sickHelpless', 'roughHands', 'packingLunch',
  ]);
  const [eventNode, setEventNode] = useState({
    trunk: 1,
    leaves: 1,
    branches: 1,
  });

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

  const addRelevantEventToQueue = useCallback((tribeId) => {
    const relevantNode = eventNode[tribeId] + 1;
    const foundEventId = Object.keys(NarrativeEvents).find(
      (narrativeEventId) => NarrativeEvents[narrativeEventId].eventType === tribeId
      && NarrativeEvents[narrativeEventId].chainNode === relevantNode,
    );
    if (foundEventId) {
      setEventQueueId((prev) => {
        const next = [...prev];
        next.push(foundEventId);
        return next;
      });
      setEventNode((prev) => {
        const next = { ...prev };
        next[tribeId] = relevantNode;
        return next;
      });
    } else {
      console.error('No event found with this tribe and progression', tribeId, relevantNode);
    }
  }, [eventNode]);

  const removeEventFromQueue = useCallback((cb) => {
    setEventQueueId((prev) => {
      const next = [...prev];
      if (next[0]) {
        const [evt] = prev;
        cb(evt);
        next.shift();
        return next;
      }
      cb(null);
      return prev;
    });
  }, []);

  const updateVar = useCallback(({ name, value, addition }) => {
    setVars((prev) => {
      const next = { ...prev };
      if (addition) {
        next[name] += Number(value);
        if (next[name] < 0) {
          next[name] = 0;
        }
      } else {
        next[name] = value;
      }
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
      next.flower += nectarToFlower(next.usedNectar) + income.flower;
      next.nectar += income.nectar;
      next.usedNectar = 0;
      nextDay = next.day;
      next.stepCycle = 0;
      next.timeBlock = 3;
      return next;
    });

    setTribes((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((tribeName) => {
        // Use nectar
        next[tribeName].infected -= next[tribeName].nectar * 10;
        if (next[tribeName].infected < 0) {
          next[tribeName].infected = 0;
        }
        next[tribeName].nectar = 0;

        // Handling deaths
        let deathToll = Math.floor(deathRatio(0.7) * next[tribeName].infected);
        if (next[tribeName].people === 1) {
          deathToll = 0;
        }
        next[tribeName].deaths += deathToll;

        // Handling peoples
        next[tribeName].people -= deathToll;
        if (next[tribeName].people <= 0) {
          next[tribeName].people = 1;
        }
        next[tribeName].newDeaths = deathToll;

        // Handling infection
        let newInfectedCounter = Math.floor(Math.random() * infectedDayRatio[nextDay].maxRand)
          + infectedDayRatio[nextDay].flatBonus;
        if (next[tribeName].people === 1) {
          newInfectedCounter = 0;
        }
        const maxInfectedCount = next[tribeName].infected + newInfectedCounter - deathToll;
        if (maxInfectedCount >= next[tribeName].people) {
          next[tribeName].newInfected = next[tribeName].people - next[tribeName].infected;
          next[tribeName].infected = next[tribeName].people;
        } else {
          next[tribeName].infected = maxInfectedCount;
          next[tribeName].newInfected = newInfectedCounter;
        }
      });
      return next;
    });
  }, [infectedDayRatio, deathRatio, income]);

  const giveNectar = useCallback((id) => {
    setTribes((prev) => {
      const next = { ...prev };
      next[id].nectar += 1;
      return next;
    });
    setVars((prev) => {
      const next = { ...prev };
      next.nectar -= 1;
      next.usedNectar += 1;
      return next;
    });
    addRelevantEventToQueue(id);
  }, [addRelevantEventToQueue]);

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
    removeEventFromQueue,
    addRelevantEventToQueue,
    giveNectar,
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
    removeEventFromQueue,
    addRelevantEventToQueue,
    giveNectar,
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
    removeEventFromQueue,
    addRelevantEventToQueue,
    giveNectar,
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
    removeEventFromQueue,
    addRelevantEventToQueue,
    giveNectar,
  };
};
