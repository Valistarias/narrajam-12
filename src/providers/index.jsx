import React from 'react';
import PropTypes from 'prop-types';

import { EventProvider } from './Event';
import { GlobalVarsProvider } from './GlobalVars';

const Providers = ({ children }) => (
  <GlobalVarsProvider>
    <EventProvider>
      {children}
    </EventProvider>
  </GlobalVarsProvider>
);

Providers.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Providers;
