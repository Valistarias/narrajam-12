import React from 'react';
import { PropTypes } from 'prop-types';
import { classTrim } from '../../utils';

import './button.scss';
import { Icon, possibleIcons } from '../atoms/icon';

const Button = ({
  submit,
  children,
  className,
  onClick,
  icon,
  onMouseLeave,
  onMouseEnter,
  preventDefault,
  disabled,
  invisible,
  theme,
}) => (
  <button
    className={classTrim(`
    button
    ${className ?? ''}
    button--theme-${theme}
    ${disabled ? ' button--disabled' : ''}
    ${invisible ? ' button--invisible' : ''}
  `)}
    type={submit ? 'submit' : 'button'}
    onClick={(e) => {
      if (preventDefault) { e.preventDefault(); }
      onClick(e);
    }}
    onMouseLeave={(e) => {
      if (preventDefault) { e.preventDefault(); }
      onMouseLeave(e);
    }}
    onMouseEnter={(e) => {
      if (preventDefault) { e.preventDefault(); }
      onMouseEnter(e);
    }}
  >
    {children}
    {
      icon ? (
        <Icon
          type={icon}
        />
      ) : null
    }
  </button>
);

Button.propTypes = {
  submit: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  icon: possibleIcons,
  theme: PropTypes.oneOf(['basic', 'title', 'icon']),
  onClick: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func,
  onMouseEnter: PropTypes.func,
  preventDefault: PropTypes.bool,
  disabled: PropTypes.bool,
  invisible: PropTypes.bool,
};

Button.defaultProps = {
  submit: false,
  icon: null,
  preventDefault: false,
  theme: 'basic',
  className: '',
  disabled: false,
  invisible: false,
  onMouseLeave: () => {},
  onMouseEnter: () => {},
};

export default Button;
