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
          <span className="creditWindow__list__main__title">Game Design</span>
          <span className="creditWindow__list__main__name">Thomas de Mot</span>
        </li>
      </ul>
      <h3 className="creditWindow__participants">Special Thanks To</h3>
      <ul className="creditWindow__list">
        <li className="creditWindow__list__sub">Philippe Vandemoere</li>
        <li className="creditWindow__list__sub">Helly Demekin</li>
        <li className="creditWindow__list__sub">Gwendoline Bleu</li>
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
