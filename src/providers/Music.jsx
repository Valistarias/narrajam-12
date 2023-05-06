/* eslint-disable no-param-reassign */
import React, {
  useState, useMemo, useContext, useCallback, useEffect, useRef,
} from 'react';
import PropTypes from 'prop-types';

import { Howl, Howler } from 'howler';

import MainTheme from '../assets/sound/main-theme.mp3';
import DryadTheme from '../assets/sound/dryad-theme.mp3';

import WhooshSound from '../assets/sound/woosh.mp3';
import DaySound from '../assets/sound/day.mp3';
import NightSound from '../assets/sound/night.mp3';
import ClickSound from '../assets/sound/click.mp3';
import TextSound from '../assets/sound/text.mp3';
import UnlockDryadSound from '../assets/sound/unlockDryad.mp3';
import UnlockTribeSound from '../assets/sound/unlockTribe.mp3';
import WrongClickSound from '../assets/sound/wrongClick.mp3';

const MusicContext = React.createContext();

export const MusicProvider = ({ children }) => {
  const [ready, setReady] = useState(0);

  const timeoutPlayWrite = useRef(true);

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
    volume: 0.2,
  }), []);

  const daySound = useMemo(() => new Howl({
    src: [DaySound],
    volume: 0.4,
  }), []);

  const nightSound = useMemo(() => new Howl({
    src: [NightSound],
    volume: 0.4,
  }), []);

  const clickSound = useMemo(() => new Howl({
    src: [ClickSound],
    volume: 0.4,
  }), []);

  const textSound = useMemo(() => new Howl({
    src: [TextSound],
    volume: 0.1,
  }), []);

  const unlockDryadSound = useMemo(() => new Howl({
    src: [UnlockDryadSound],
    volume: 0.4,
  }), []);

  const unlockTribeSound = useMemo(() => new Howl({
    src: [UnlockTribeSound],
    volume: 0.4,
  }), []);

  const wrongClickSound = useMemo(() => new Howl({
    src: [WrongClickSound],
    volume: 0.4,
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

  const day = useCallback(() => {
    daySound.play();
  }, [daySound]);

  const night = useCallback(() => {
    nightSound.play();
  }, [nightSound]);

  const click = useCallback(() => {
    clickSound.play();
  }, [clickSound]);

  const text = useCallback(() => {
    if (timeoutPlayWrite.current) {
      textSound.play();
      timeoutPlayWrite.current = false;
      setTimeout(() => {
        timeoutPlayWrite.current = true;
      }, 1000);
    }
  }, [textSound]);

  const unlockDryad = useCallback(() => {
    unlockDryadSound.play();
  }, [unlockDryadSound]);

  const unlockTribe = useCallback(() => {
    unlockTribeSound.play();
  }, [unlockTribeSound]);

  const wrongClick = useCallback(() => {
    wrongClickSound.play();
  }, [wrongClickSound]);

  const providerValues = useMemo(() => ({
    ready,
    switchMusic,
    muteAll,
    whoosh,
    day,
    night,
    click,
    text,
    unlockDryad,
    unlockTribe,
    wrongClick,
  }), [
    ready,
    switchMusic,
    muteAll,
    whoosh,
    day,
    night,
    click,
    text,
    unlockDryad,
    unlockTribe,
    wrongClick,
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
    day,
    night,
    click,
    text,
    unlockDryad,
    unlockTribe,
    wrongClick,
  } = useContext(MusicContext);

  return {
    ready,
    switchMusic,
    muteAll,
    whoosh,
    day,
    night,
    click,
    text,
    unlockDryad,
    unlockTribe,
    wrongClick,
  };
};
