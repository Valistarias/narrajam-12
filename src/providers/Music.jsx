/* eslint-disable no-param-reassign */
import React, {
  useState, useMemo, useContext, useCallback, useEffect,
} from 'react';
import PropTypes from 'prop-types';

import { Howl, Howler } from 'howler';

import MainTheme from '../assets/sound/main-theme.mp3';
import DryadTheme from '../assets/sound/dryad-theme.mp3';

import WhooshSound from '../assets/sound/wooshTemp.mp3';
import WhooshSound2 from '../assets/sound/wooshTemp2.mp3';
import PingSound from '../assets/sound/pingTemp.mp3';

const MusicContext = React.createContext();

export const MusicProvider = ({ children }) => {
  const [ready, setReady] = useState(0);

  const mainSound = useMemo(() => new Howl({
    src: [MainTheme],
    loop: true,
    html5: true,
  }), []);

  const dryadSound = useMemo(() => new Howl({
    src: [DryadTheme],
    loop: true,
    html5: true,
  }), []);

  const whooshSound = useMemo(() => new Howl({
    src: [WhooshSound],
  }), []);

  const whooshSound2 = useMemo(() => new Howl({
    src: [WhooshSound2],
  }), []);

  const pingSound = useMemo(() => new Howl({
    src: [PingSound],
  }), []);

  useEffect(() => {
    mainSound.once('load', () => {
      setReady((prev) => prev + 1);
    });

    dryadSound.once('load', () => {
      setReady((prev) => prev + 1);
    });
  }, [dryadSound, mainSound]);

  const muteAll = useCallback(() => {
    Howler.mute(true);
  }, []);

  const fadeMainVolumeToDown = useCallback(() => {
    const step = 0.01;
    const actualVolume = mainSound.volume();
    if (actualVolume > step) {
      mainSound.volume(actualVolume - step);
      setTimeout(() => {
        fadeMainVolumeToDown();
      }, '10');
    } else {
      mainSound.volume(0);
      mainSound.pause();
    }
  }, [mainSound]);

  const fadeDryadVolumeToDown = useCallback(() => {
    const step = 0.01;
    const actualVolume = dryadSound.volume();
    if (actualVolume > step) {
      dryadSound.volume(actualVolume - step);
      setTimeout(() => {
        fadeDryadVolumeToDown();
      }, '10');
    } else {
      dryadSound.volume(0);
      dryadSound.pause();
    }
  }, [dryadSound]);

  const fadeMainVolumeToUp = useCallback(() => {
    const step = 0.01;
    const actualVolume = mainSound.volume();
    if (actualVolume < 1 - step) {
      mainSound.volume(actualVolume + step);
      setTimeout(() => {
        fadeMainVolumeToUp();
      }, '10');
    } else {
      mainSound.volume(10);
    }
  }, [mainSound]);

  const fadeDryadVolumeToUp = useCallback(() => {
    const step = 0.01;
    const actualVolume = dryadSound.volume();
    if (actualVolume < 1 - step) {
      dryadSound.volume(actualVolume + step);
      setTimeout(() => {
        fadeDryadVolumeToUp();
      }, '10');
    } else {
      dryadSound.volume(10);
    }
  }, [dryadSound]);

  const switchMusic = useCallback((id) => {
    if (id === 'main') {
      if (dryadSound.playing()) {
        fadeDryadVolumeToDown();
      }
      mainSound.play();
      fadeMainVolumeToUp();
    } else {
      if (mainSound.playing()) {
        fadeMainVolumeToDown();
      }
      dryadSound.play();
      fadeDryadVolumeToUp();
    }
  }, [
    dryadSound,
    mainSound,
    fadeMainVolumeToUp,
    fadeDryadVolumeToDown,
    fadeDryadVolumeToUp,
    fadeMainVolumeToDown,
  ]);

  const whoosh = useCallback(() => {
    whooshSound.play();
  }, [whooshSound]);

  const whoosh2 = useCallback(() => {
    whooshSound2.play();
  }, [whooshSound2]);

  const ping = useCallback(() => {
    pingSound.play();
  }, [pingSound]);

  const providerValues = useMemo(() => ({
    ready,
    switchMusic,
    muteAll,
    whoosh,
    whoosh2,
    ping,
  }), [
    ready,
    switchMusic,
    muteAll,
    whoosh,
    whoosh2,
    ping,
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
    muteAll,
    whoosh,
    whoosh2,
    ping,
  } = useContext(MusicContext);

  return {
    ready,
    switchMusic,
    muteAll,
    whoosh,
    whoosh2,
    ping,
  };
};
