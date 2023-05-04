import React, { useEffect, useMemo, useState } from 'react';
import { PropTypes } from 'prop-types';
import { classTrim, nectarToFlower } from '../../utils';

import './nectarGiveway.scss';
import Button from './button';
import { Icon } from '../atoms/icon';
import { tribeShape } from '../types/tribe';

const NectarGiveway = ({
  tribe,
  canGiveNectar,
  onGive,
}) => {
  const [localCanGiveNectar, setLocalCanGiveNectar] = useState(true);

  const pools = useMemo(() => {
    const maxHealth = 7;
    const deathsPool = tribe.deaths >= 1 ? Math.round(tribe.deaths / 10) || 1 : 0;
    const infectedPool = (
      tribe.infected >= 1 ? Math.round(tribe.infected / 10) || 1 : 0
    ) - tribe.nectar;
    const healthPool = maxHealth - infectedPool - deathsPool - tribe.nectar;
    return {
      max: maxHealth,
      deathsPool,
      infectedPool,
      healthPool,
      nectarPool: tribe.nectar || 0,
    };
  }, [tribe?.deaths, tribe?.infected, tribe?.nectar]);

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
      pools.infectedPool >= 1
      && pools.nectarPool <= pools.infectedPool
    ) {
      setLocalCanGiveNectar(true);
    } else {
      setLocalCanGiveNectar(false);
    }
  }, [pools]);

  return (
    <div
      className={classTrim(`
        nectarGiveway
      `)}
    >
      {healthIndicator}
      <div
        className={classTrim(`
          nectarGiveway__bonus
          ${tribe.nectar > 0 ? ' nectarGiveway__bonus--visible' : ''}
        `)}
      >
        <p className="nectarGiveway__bonus__detail">Bonus :</p>
        <div className="nectarGiveway__bonus__block">
          <p className="nectarGiveway__bonus__number">
            {`+${nectarToFlower(tribe.nectar)}`}
          </p>
          <Icon
            className="nectarGiveway__bonus__icon"
            type="flower"
          />
        </div>
      </div>
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
  tribe: tribeShape.isRequired,
  canGiveNectar: PropTypes.bool,
  onGive: PropTypes.func.isRequired,
};

NectarGiveway.defaultProps = {
  canGiveNectar: true,
};

export default NectarGiveway;
