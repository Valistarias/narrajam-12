import React, { useMemo } from 'react';
import { PropTypes } from 'prop-types';
import { classTrim } from '../../utils';
import { Icon } from '../atoms/icon';

import ValerianImg from '../../assets/imgs/valerian.png';
import BelladonnaImg from '../../assets/imgs/belladonna.png';
import BorageImg from '../../assets/imgs/borage.png';
import ButterlyImg from '../../assets/imgs/butterly.png';
import CallaLillyImg from '../../assets/imgs/callaLilly.png';
import CandytuftImg from '../../assets/imgs/candytuft.png';
import ChivesImg from '../../assets/imgs/chives.png';
import BluebellsImg from '../../assets/imgs/cluebells.png';
import CorianderImg from '../../assets/imgs/coriander.png';
import CrocusImg from '../../assets/imgs/crocus.png';
import EdelweissImg from '../../assets/imgs/edelweiss.png';
import GeraniumImg from '../../assets/imgs/geranium.png';
import HollyImg from '../../assets/imgs/holly.png';
import HyssopImg from '../../assets/imgs/hyssop.png';
import SageImg from '../../assets/imgs/sage.png';

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
  const flowerImg = useMemo(() => {
    switch (id) {
      case 'belladonna': return <img alt={id} src={BelladonnaImg} className="hybridationNode__flower" />;
      case 'borage': return <img alt={id} src={BorageImg} className="hybridationNode__flower" />;
      case 'butterflyWeed': return <img alt={id} src={ButterlyImg} className="hybridationNode__flower" />;
      case 'callaLily': return <img alt={id} src={CallaLillyImg} className="hybridationNode__flower" />;
      case 'candytuft': return <img alt={id} src={CandytuftImg} className="hybridationNode__flower" />;
      case 'chives': return <img alt={id} src={ChivesImg} className="hybridationNode__flower" />;
      case 'bluebell': return <img alt={id} src={BluebellsImg} className="hybridationNode__flower" />;
      case 'coriander': return <img alt={id} src={CorianderImg} className="hybridationNode__flower" />;
      case 'crocus': return <img alt={id} src={CrocusImg} className="hybridationNode__flower" />;
      case 'edelweiss': return <img alt={id} src={EdelweissImg} className="hybridationNode__flower" />;
      case 'geranium': return <img alt={id} src={GeraniumImg} className="hybridationNode__flower" />;
      case 'holly': return <img alt={id} src={HollyImg} className="hybridationNode__flower" />;
      case 'hyssop': return <img alt={id} src={HyssopImg} className="hybridationNode__flower" />;
      case 'sage': return <img alt={id} src={SageImg} className="hybridationNode__flower" />;
      default: return <img alt={id} src={ValerianImg} className="hybridationNode__flower" />;
    }
  }, [id]);

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
      {flowerImg}
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
