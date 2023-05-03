import React, { useMemo } from 'react';
import { PropTypes } from 'prop-types';
import { classTrim } from '../../utils';
import { Icon } from '../atoms/icon';

import NeutralDone from '../../assets/imgs/neutralDone.jpg';
import TribeDone from '../../assets/imgs/tribeDone.jpg';
import DryadDone from '../../assets/imgs/dryadDone.png';

import './hybridationNode.scss';

const HybridationNode = ({
  tribe,
  nectarGiven,
  onGive,
  onRemove,
}) => {
  const doneDom = useMemo(() => {
    const classes = 'hybridationNode__img';
    const alt = 'Completed';
    switch (type) {
      case 'tribe': {
        return (
          <img className={classes} src={TribeDone} alt={alt} />
        );
      }
      case 'dryad': {
        return (
          <img className={classes} src={DryadDone} alt={alt} />
        );
      }
      default: {
        return (
          <img className={classes} src={NeutralDone} alt={alt} />
        );
      }
    }
  }, [type]);

  return (
    <div
      className={classTrim(`
      nectarGiveway
    `)}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyDown={onClick}
      role="button"
      tabIndex={0}
    >
      <Icon
        className="hybridationNode__icon"
        type={state === 'completed' ? 'singleHybridSelected' : 'singleHybrid'}
      />
      <Icon
        className="hybridationNode__icon__backdrop"
        type={state === 'completed' ? 'singleHybridSelected' : 'singleHybrid'}
      />
      {doneDom}
    </div>
  );
};

HybridationNode.propTypes = {
  id: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  notUnlocked: PropTypes.bool,
  type: PropTypes.oneOf(['tribe', 'dryad', 'neutral']).isRequired,
  state: PropTypes.oneOf(['idle', 'launched', 'completed']),
  onClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
};

HybridationNode.defaultProps = {
  state: 'idle',
  selected: false,
  notUnlocked: false,
  onMouseEnter: () => {},
  onMouseLeave: () => {},
};

export default HybridationNode;
