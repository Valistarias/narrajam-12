import React, { useEffect, useState } from 'react';

import './creditWindow.scss';
import { useGlobalVars } from '../../providers/GlobalVars';
import Button from '../molecules/button';
import { classTrim } from '../../utils';

const CreditWindow = () => {
  const { vars, updateVar } = useGlobalVars();

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!!vars.DISPLAY_CREDITS);
  }, [vars?.DISPLAY_CREDITS]);

  return (
    <div className={classTrim(`
      creditWindow
      ${visible ? ' creditWindow--visible' : ''}
    `)}
    >
      <h2 className="creditWindow__title">Credits</h2>
      <p className="creditWindow__sub">Proudly made with React</p>
      <ul className="creditWindow__list">
        <li className="creditWindow__list__main">
          <span className="creditWindow__list__main__title">Game Design / Writing</span>
          <span className="creditWindow__list__main__name">Thomas De Mot</span>
        </li>
        <li className="creditWindow__list__main">
          <span className="creditWindow__list__main__title">Game Art</span>
          <span className="creditWindow__list__main__name">Viviane Bicaba</span>
        </li>
        <li className="creditWindow__list__main">
          <span className="creditWindow__list__main__title">Development</span>
          <span className="creditWindow__list__main__name">Victor Mallet</span>
        </li>
        <li className="creditWindow__list__main">
          <span className="creditWindow__list__main__title">Sound Design / Music</span>
          <span className="creditWindow__list__main__name">Francois Guyon</span>
        </li>
      </ul>
      <h3 className="creditWindow__participants">Special Thanks To</h3>
      <ul className="creditWindow__list">
        <li className="creditWindow__list__sub">Philippe Vandermoere</li>
        <li className="creditWindow__list__sub">Helly Demekin</li>
        <li className="creditWindow__list__sub">Gwendolyn Bleu</li>
      </ul>
      <h3 className="creditWindow__participants">Production cats</h3>
      <ul className="creditWindow__list">
        <li className="creditWindow__list__sub">Barnaby</li>
        <li className="creditWindow__list__sub">Kaiba</li>
      </ul>
      <Button
        onClick={() => {
          updateVar({
            name: 'DISPLAY_CREDITS',
            value: false,
          });
        }}
      >
        Close
      </Button>
    </div>
  );
};

export default CreditWindow;
