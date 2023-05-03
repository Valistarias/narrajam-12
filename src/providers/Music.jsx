/* eslint-disable no-param-reassign */
import React, {
  useState, useMemo, useContext, useCallback, useEffect,
} from 'react';
import PropTypes from 'prop-types';

import { Howl } from 'howler';

import MainTheme from '../assets/sound/main-theme.mp3';
import DryadTheme from '../assets/sound/dryad-theme.mp3';

const MusicContext = React.createContext();

export const MusicProvider = ({ children }) => {
  const [ready, setReady] = useState(0);

  const mainSound = useMemo(() => new Howl({
    src: [MainTheme],
    html5: true,
  }), []);

  const dryadSound = useMemo(() => new Howl({
    src: [DryadTheme],
    html5: true,
  }), []);

  useEffect(() => {
    mainSound.once('load', () => {
      setReady((prev) => prev + 1);
    });

    dryadSound.once('load', () => {
      setReady((prev) => prev + 1);
    });
  }, [dryadSound, mainSound]);

  const fadeMainVolumeToDown = useCallback(() => {
    const step = 0.01;
    const actualVolume = mainSound.volume();
    if (actualVolume > 0) {
      mainSound.volume(actualVolume - step);
      setTimeout(() => {
        fadeMainVolumeToDown();
      }, '10');
    } else {
      mainSound.stop();
    }
  }, [mainSound]);

  const fadeDryadVolumeToDown = useCallback(() => {
    const step = 0.01;
    const actualVolume = dryadSound.volume();
    if (actualVolume > 0) {
      dryadSound.volume(actualVolume - step);
      setTimeout(() => {
        fadeDryadVolumeToDown();
      }, '10');
    } else {
      dryadSound.stop();
    }
  }, [dryadSound]);

  const switchMusic = useCallback((id) => {
    console.log('switchMusic', id);
    if (id === 'main') {
      console.log('ID', id);
      if (dryadSound.playing()) {
        fadeDryadVolumeToDown();
      }
      // dryadSound.stop();
      // mainSound.stop();
      mainSound.stop();
      mainSound.volume(1);
      console.log('volume', mainSound.volume());
      mainSound.play();
      console.log('playing', mainSound.playing());
      // mainSound.fade(0, 1, 1000);
    } else {
      if (mainSound.playing()) {
        fadeMainVolumeToDown();
      }
      // mainSound.stop();
      dryadSound.stop();
      dryadSound.volume(1);
      dryadSound.play();
    }
  }, [fadeDryadVolumeToDown, mainSound, fadeMainVolumeToDown, dryadSound]);

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
