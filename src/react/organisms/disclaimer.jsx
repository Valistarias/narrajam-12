import React, { useState } from 'react';

import { useMusic } from '../../providers/Music';
import Button from '../molecules/button';
import { classTrim } from '../../utils';

import './disclaimer.scss';

const Disclaimer = () => {
  const { ready, switchMusic, muteAll } = useMusic();

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
          This game contains themes of abuse which may be upsetting for some readers.
        </p>
        <div className="disclaimer__block__buttons">
          {
            ready < 2 ? (
              <p className="disclaimer__block__buttons__loading">Loading...</p>
            ) : (
              <>
                <Button
                  onClick={() => {
                    setVisible(false);
                    switchMusic('main');
                  }}
                >
                  Continue With Sound
                </Button>
                <Button
                  onClick={() => {
                    setVisible(false);
                    muteAll();
                  }}
                >
                  Continue Without Sound
                </Button>
              </>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
