import React from 'react';
import PropTypes from 'prop-types';

import { EventProvider } from './Event';
import { MusicProvider } from './Music';
import { GlobalVarsProvider } from './GlobalVars';

const Providers = ({ children }) => (
  <GlobalVarsProvider>
    <EventProvider>
      <MusicProvider>
        {children}
      </MusicProvider>
    </EventProvider>
  </GlobalVarsProvider>
);

Providers.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Providers;
