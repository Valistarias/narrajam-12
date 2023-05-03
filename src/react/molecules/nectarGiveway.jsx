import React, { useEffect, useMemo, useState } from 'react';
import { PropTypes } from 'prop-types';
import { classTrim } from '../../utils';
import { Icon } from '../atoms/icon';

import './nectarGiveway.scss';
import Button from './button';

const NectarGiveway = ({
  tribe,
  nectarGiven,
  canGiveNectar,
  onGive,
}) => {
  const [localCanGiveNectar, setLocalCanGiveNectar] = useState(true);

  const pools = useMemo(() => {
    const maxHealth = 7;
    const deathsPool = tribe.deaths >= 1 ? Math.round(tribe.deaths / 10) || 1 : 0;
    const infectedPool = (
      tribe.infected >= 1 ? Math.round(tribe.infected / 10) || 1 : 0
    ) - nectarGiven;
    const healthPool = maxHealth - infectedPool - deathsPool;
    return {
      max: maxHealth,
      deathsPool,
      infectedPool,
      healthPool,
      nectarPool: nectarGiven,
    };
  }, [nectarGiven, tribe?.deaths, tribe?.infected]);

  console.log('pools', pools);

  const healthIndicator = useMemo(() => {
    const domBar = [];
    for (let i = 0; i < pools.healthPool; i += 1) {
      domBar.push(
        <div
          key={`healthPool-${i}`}
          className={classTrim(`
            nectarGiveway__healthBar__bar
            nectarGiveway__healthBar__bar--healthy
          `)}
        />,
      );
    }
    for (let i = 0; i < pools.infectedPool; i += 1) {
      domBar.push(
        <div
          key={`infectedPool-${i}`}
          className={classTrim(`
            nectarGiveway__healthBar__bar
            nectarGiveway__healthBar__bar--infected
          `)}
        />,
      );
    }
    for (let i = 0; i < pools.nectarPool; i += 1) {
      domBar.push(
        <div
          key={`nectarPool-${i}`}
          className={classTrim(`
            nectarGiveway__healthBar__bar
            nectarGiveway__healthBar__bar--nectar
          `)}
        />,
      );
    }
    for (let i = 0; i < pools.deathsPool; i += 1) {
      domBar.push(
        <div
          key={`deathsPool-${i}`}
          className={classTrim(`
            nectarGiveway__healthBar__bar
            nectarGiveway__healthBar__bar--deaths
          `)}
        />,
      );
    }
    return (
      <div className="nectarGiveway__healthBar">
        {domBar}
      </div>
    );
  }, [pools]);

  useEffect(() => {
    if (
      pools.deathsPool
      + pools.infectedPool
      + pools.healthPool
      + pools.nectarPool
      + 1 >= pools.max
    ) {
      setLocalCanGiveNectar(false);
    } else {
      setLocalCanGiveNectar(true);
    }
  }, [pools]);

  return (
    <div
      className={classTrim(`
        nectarGiveway
      `)}
    >
      {healthIndicator}
      <Button
        onClick={onGive}
        className="nectarGiveway__button"
        disabled={!canGiveNectar || !localCanGiveNectar}
      >
        Give Nectar
      </Button>
    </div>
  );
};

NectarGiveway.propTypes = {
  tribe: PropTypes.string.isRequired,
  nectarGiven: PropTypes.number,
  canGiveNectar: PropTypes.bool,
  onGive: PropTypes.func.isRequired,
};

NectarGiveway.defaultProps = {
  nectarGiven: 0,
  canGiveNectar: true,
};

export default NectarGiveway;
