import { PropTypes } from 'prop-types';
import React from 'react';
import { classTrim } from '../../utils';

import './button.scss';

const Button = ({
  submit,
  children,
  className,
  onClick,
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
  </button>
);

Button.propTypes = {
  submit: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  theme: PropTypes.oneOf(['basic', 'title']),
  onClick: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func,
  onMouseEnter: PropTypes.func,
  preventDefault: PropTypes.bool,
  disabled: PropTypes.bool,
  invisible: PropTypes.bool,
};

Button.defaultProps = {
  submit: false,
  preventDefault: false,
  theme: 'basic',
  className: '',
  disabled: false,
  invisible: false,
  onMouseLeave: () => {},
  onMouseEnter: () => {},
};

export default Button;
