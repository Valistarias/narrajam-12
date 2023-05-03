import React, { useEffect, useState } from 'react';

import { useMusic } from '../../providers/Music';
import Button from '../molecules/button';
import { classTrim } from '../../utils';

import './disclaimer.scss';

const Disclaimer = () => {
  const { ready, switchMusic } = useMusic();

  const [visible, setVisible] = useState(true);

  return (
    <div className={classTrim(`
      disclaimer
      ${visible ? ' disclaimer--visible' : ''}
    `)}
    >
      <div className="disclaimer__block">
        <h2 className="disclaimer__block__title">Disclaimer</h2>
        <p className="disclaimer__block__sub">Mild Language, Abuse</p>
        <p className="disclaimer__block__main">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus semper,
          felis in euismod congue, magna mi ullamcorper neque, id condimentum sem mi at ipsum.
          Also, mild language and abuse. Also, sound.
        </p>
        <div className="disclaimer__block__buttons">
          <Button
            disabled={ready < 2}
            onClick={() => {
              setVisible(false);
              switchMusic('main');
            }}
          >
            Continue With Sound
          </Button>
          <Button
            disabled={ready < 2}
            onClick={() => {
              setVisible(false);
            }}
          >
            Continue Without Sound
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
