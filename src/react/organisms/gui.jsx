import React, {
  useEffect, useState,
} from 'react';

import { useGlobalVars } from '../../providers/GlobalVars';
import { classTrim } from '../../utils';

import './gui.scss';

const Gui = () => {
  const {
    vars,
  } = useGlobalVars();

  console.log('vars', vars);

  return (
    <div className={classTrim(`
      gui
    `)}
    >
      <div className="gui__timebar">
        <div className="gui__timebar__fg">
          <div className="gui__timebar__fg__morning" />
          <div className="gui__timebar__fg__day" />
          <div className="gui__timebar__fg__evening" />
        </div>
        <div className="gui__timebar__bg">
          <div className="gui__timebar__bg__morning" />
          <div className="gui__timebar__bg__day" />
          <div className="gui__timebar__bg__evening" />
        </div>
      </div>
    </div>
  );
};

export default Gui;
