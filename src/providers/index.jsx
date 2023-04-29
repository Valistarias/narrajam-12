import React from 'react';
import PropTypes from 'prop-types';

import { EventProvider } from './Event';

const Providers = ({ children }) => (
  <EventProvider>
    {children}
  </EventProvider>
);

Providers.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Providers;
