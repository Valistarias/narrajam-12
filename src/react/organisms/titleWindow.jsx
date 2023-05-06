import React, { useCallback, useEffect, useState } from 'react';

import './titleWindow.scss';
import Button from '../molecules/button';
import { useGlobalVars } from '../../providers/GlobalVars';
import { classTrim } from '../../utils';

const TitleWindow = () => {
  const { displayedScreen, setDisplayedScreen, updateVar } = useGlobalVars();

  const [visible, setVisible] = useState(true);

  const onCreditClick = useCallback(() => {
    updateVar({
      name: 'DISPLAY_CREDITS',
      value: true,
    });
  }, [updateVar]);

  useEffect(() => {
    setVisible(displayedScreen === 'title');
  }, [displayedScreen]);

  return (
    <div className={classTrim(`
      titleWindow
      ${visible ? ' titleWindow--visible' : ''}
    `)}
    >
      <div className="titleWindow__menu">
        <div className="titleWindow__menu__title">
          <h1 className="titleWindow__menu__title__main">Of Ashen Lands And Growing Flowers</h1>
          <p className="titleWindow__menu__title__sub">A WA30 Project</p>
        </div>
        <div className="titleWindow__menu__text">
          <p className="titleWindow__menu__text__content">The story of an unexpected discovery, a plagued village, and the Botanist in between.</p>
        </div>
        <div className="titleWindow__menu__buttons">
          <Button
            theme="title"
            onClick={() => {
              setDisplayedScreen('game');
            }}
          >
            Play
          </Button>
          {/* <Button
            theme="title"
            onClick={() => {}}
            disabled
          >
            Settings
          </Button> */}
          <Button
            theme="title"
            onClick={onCreditClick}
          >
            Credits
          </Button>
        </div>
        <div className="titleWindow__menu__footer">
          <p className="titleWindow__menu__footer__text">A Narrative Driven Game Jam Experience</p>
          <p className="titleWindow__menu__footer__text">04|2023</p>
        </div>
      </div>
    </div>
  );
};

export default TitleWindow;
