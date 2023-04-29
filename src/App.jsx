import React from 'react';

import Providers from './providers';

import Home from './react/pages/home';

const App = () => (
  <Providers>
    <div className="main main-theme">
      <Home />
    </div>
  </Providers>
);

export default App;
