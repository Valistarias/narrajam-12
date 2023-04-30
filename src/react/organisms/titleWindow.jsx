import React, { useCallback } from 'react';

import './titleWindow.scss';
import Button from '../molecules/button';
import { useGlobalVars } from '../../providers/GlobalVars';

const TitleWindow = () => {
  const { vars, updateVar } = useGlobalVars();

  const onCreditClick = useCallback(() => {
    updateVar({
      name: 'DISPLAY_CREDITS',
      value: true,
    });
  }, [updateVar]);

  return (
    <div className="titleWindow">
      <div className="titleWindow__menu">
        <div className="titleWindow__menu__title">
          <h1 className="titleWindow__menu__title__main">Title</h1>
          <p className="titleWindow__menu__title__sub">The very best subtitle there is</p>
        </div>
        <div className='titleWindow__menu__text'>
          <p className='titleWindow__menu__text__content'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae enim lacus. Integer blandit tellus vel ornare consectetur. Fusce sed ex nunc. Cras eget odio urna. Duis ullamcorper nunc vel commodo lacinia. Nullam finibus fringilla quam, sed maximus leo consequat vitae. Sed id est gravida, vehicula nisl interdum, viverra urna. Etiam posuere tortor a nibh pulvinar, eget convallis massa interdum. Integer sed finibus lectus. Fusce consectetur tincidunt erat vel vehicula.</p>
        </div>
        <div className='titleWindow__menu__buttons'>
          <Button
            theme="title"
          >
            Play
          </Button>
          <Button
            theme="title"
          >
            Settings
          </Button>
          <Button
            theme="title"
            onClick={onCreditClick}
          >
            Credits
          </Button>
        </div>
        <div className='titleWindow__menu__footer'>
          <p className='titleWindow__menu__footer__text'>A Narrative Driven Game Jam Experience</p>
          <p className='titleWindow__menu__footer__text'>04|2023</p>
        </div>
      </div>
    </div>
  );
};

export default TitleWindow;
