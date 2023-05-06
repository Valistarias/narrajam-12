import React, { useMemo } from 'react';
import { PropTypes } from 'prop-types';
import { classTrim } from '../../utils';
import { Icon } from '../atoms/icon';

import BaseTribe from '../../assets/imgs/support-hybridation-tribe.png';
import BaseDryad from '../../assets/imgs/support-hybridation-dryad.png';

import HybridationNodeImg from '../../assets/imgs/hybridation-node.png';

import './hybridationNode.scss';

const HybridationNode = ({
  id,
  type,
  state,
  onClick,
  selected,
  onMouseEnter,
  onMouseLeave,
  notUnlocked,
}) => {
  const baseDom = useMemo(() => {
    const alt = 'Completed';
    switch (type) {
      case 'tribe': {
        return (
          <img className="hybridationNode__base hybridationNode__base--tribe" src={BaseTribe} alt={alt} />
        );
      }
      case 'dryad': {
        return (
          <img className="hybridationNode__base hybridationNode__base--dryad" src={BaseDryad} alt={alt} />
        );
      }
      default: {
        return null;
      }
    }
  }, [type]);

  return (
    <div
      className={classTrim(`
      hybridationNode
      hybridationNode--type-${type}
      hybridationNode--id-${id}
      hybridationNode--${state}
      ${selected ? 'hybridationNode--selected' : ''}
      ${notUnlocked ? 'hybridationNode--notUnlocked' : ''}
    `)}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyDown={onClick}
      role="button"
      tabIndex={0}
    >
      <img
        alt="node"
        src={HybridationNodeImg}
        className="hybridationNode__icon"
      />
      <Icon
        className="hybridationNode__icon__backdrop"
        type={state === 'completed' ? 'singleHybridSelected' : 'singleHybrid'}
      />
      <div className="hybridationNode__flower" />
      {/* {flowerImg} */}
      {baseDom}
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
