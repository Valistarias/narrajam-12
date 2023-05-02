import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import FlowerLogo from '../../assets/icons/flower.svg';
import NectarLogo from '../../assets/icons/nectar.svg';
import PeopleLogo from '../../assets/icons/people.svg';
import HybridLogo from '../../assets/icons/hybrid.svg';
import LeafLogo from '../../assets/icons/leaf.svg';

import './icon.scss';
import { classTrim } from '../../utils';

export const possibleIcons = PropTypes.oneOf(['flower', 'nectar', 'people', 'hybrid', 'leaf']);

export const Icon = ({
  type,
  className,
}) => {
  const classes = useMemo(() => classTrim(`
    icon
    ${className ?? ''}
  `), [className]);

  const icoDom = useMemo(() => {
    switch (type) {
      case 'flower': return <FlowerLogo className={classes} />;
      case 'nectar': return <NectarLogo className={classes} />;
      case 'hybrid': return <HybridLogo className={classes} />;
      case 'leaf': return <LeafLogo className={classes} />;
      default: return <PeopleLogo className={classes} />;
    }
  }, [type, classes]);

  return icoDom;
};

Icon.propTypes = {
  type: PropTypes.oneOf(['flower', 'nectar', 'people', 'hybrid', 'leaf']),
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  preventDefault: PropTypes.bool,
};

Icon.defaultProps = {
  type: 'people',
  onClick: () => {},
  preventDefault: false,
};
