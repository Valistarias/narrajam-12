import React, {
  useState, useMemo, useContext, useCallback, useRef,
} from 'react';
import PropTypes from 'prop-types';
import useSound from 'use-sound';

import MainTheme from '../assets/sound/main-theme.mp3';
import DryadTheme from '../assets/sound/dryad-theme.mp3';

const MusicContext = React.createContext();

export const MusicProvider = ({ children }) => {
  const [ready, setReady] = useState(0);
  const [playMainTheme, { sound: mainThemeSound }] = useSound(MainTheme, {
    loop: true,
    onload: () => {
      console.log('ok');
      setReady((prev) => prev + 1);
    },
  });

  const [playDryadTheme, { sound: mainDryadSound }] = useSound(DryadTheme, {
    loop: true,
    onload: () => {
      console.log('ok');
      setReady((prev) => prev + 1);
    },
  });
  // Numeral values
  const switchMusic = useCallback((id) => {
    if (id === 'main') {
      playMainTheme();
      mainThemeSound.fade(0, 1, 1000);
      if (mainDryadSound?.playing()) {
        mainDryadSound.fade(1, 0, 1000);
      }
    } else {
      playDryadTheme();
      mainDryadSound.fade(0, 1, 1000);

      if (mainThemeSound?.playing()) {
        mainThemeSound.fade(1, 0, 1000);
      }
    }
  }, [playMainTheme, mainThemeSound, playDryadTheme, mainDryadSound]);

  const providerValues = useMemo(() => ({
    ready,
    switchMusic,
  }), [
    ready,
    switchMusic,
  ]);

  return (
    <MusicContext.Provider value={providerValues}>
      {children}
    </MusicContext.Provider>
  );
};

MusicProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useMusic = () => {
  const {
    ready,
    switchMusic,
  } = useContext(MusicContext);

  return {
    ready,
    switchMusic,
  };
};
