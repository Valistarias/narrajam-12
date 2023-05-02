import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import { PropTypes } from 'prop-types';

import './ressourceBlock.scss';
import { Icon, possibleIcons } from '../../atoms/icon';

const RessourceBlock = ({ text, value, logo }) => {
  const textDom = useRef();
  const [textDisplayed, setTextDisplayed] = useState(false);
  const [textWidth, setTextWidth] = useState(0);

  useEffect(() => {
    setTextWidth(textDom.current.getBoundingClientRect().width);
  }, []);

  return (
    <div
      className="ressource-block__ressource-counter"
      onMouseLeave={() => {
        setTextDisplayed(false);
      }}
      onMouseEnter={() => {
        setTextDisplayed(true);
      }}
    >
      <Icon type={logo} className="ressource-block__ressource-counter__icon" />
      <div
        className="ressource-block__ressource-counter__text-casing"
        style={{
          width: textDisplayed ? `${(textWidth + 10) / 10}rem` : '0',
        }}
      >
        <p className="ressource-block__ressource-counter__text" ref={textDom}>{text}</p>
      </div>
      <p className="ressource-block__ressource-counter__counter">{value}</p>
    </div>
  );
};

RessourceBlock.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  logo: possibleIcons,
};

RessourceBlock.defaultProps = {
  logo: 'people',
};

export default RessourceBlock;
