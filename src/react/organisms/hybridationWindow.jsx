import React, {
  useCallback,
  useEffect, useRef, useState,
} from 'react';

import ScrollContainer from 'react-indiana-drag-scroll';
import Hybridations from '../../assets/data/hybridations';

import { useGlobalVars } from '../../providers/GlobalVars';
import { classTrim } from '../../utils';

import HybridationNode from '../molecules/hybridationNode';

import './hybridationWindow.scss';
import { Icon } from '../atoms/icon';
import Button from '../molecules/button';

const HybridationWindow = () => {
  const [visible, setVisible] = useState(false);

  const [selectedTalent, setSelectedTalent] = useState(null);
  const [openInfo, setOpenInfo] = useState(false);

  const scrollRef = useRef();

  const treeRef = useRef();

  // const [lockInfo, setLockInfo] = useState(false);

  const [canResearch, setCanResearch] = useState(false);

  const {
    vars,
    researchHybridation,
    hybridationIds,
    hybridationResearch,
  } = useGlobalVars();

  const selectTalent = useCallback((id) => {
    if (!Hybridations[id]) {
      console.error('Hybridation Id not found', id);
    }
    if (selectedTalent?.id === id && openInfo) {
      setOpenInfo(false);
    } else {
      setSelectedTalent({
        id,
        ...Hybridations[id],
      });
      setOpenInfo(true);
    }
  }, [selectedTalent, openInfo]);

  const onHybridationClick = useCallback(() => {
    if (selectedTalent?.id) {
      researchHybridation(selectedTalent?.id);
    }
  }, [researchHybridation, selectedTalent?.id]);

  useEffect(() => {
    if (
      selectedTalent?.flowerCost <= vars.flower
      // && selectedTalent?.duration <= vars.timeBlock
    ) {
      setCanResearch(true);
    } else {
      setCanResearch(false);
    }
  }, [vars, selectedTalent]);

  useEffect(() => {
    setVisible(!!vars.DISPLAY_HYBRIDATION);

    if (vars.DISPLAY_HYBRIDATION) {
      setOpenInfo(false);
    }
  }, [vars?.DISPLAY_HYBRIDATION]);

  useEffect(() => {
    if (visible && scrollRef.current) {
      scrollRef.current.getElement().scrollTo(
        (treeRef.current.getBoundingClientRect().width / 2) - (window.innerWidth / 2),
        (window.innerHeight / 2) - 100,
      );
    }
  }, [visible]);

  return (
    <ScrollContainer
      ref={scrollRef}
      vertical
      horizontal
      hideScrollbars
      className={classTrim(`
        hybridationWindow
        ${visible ? ' hybridationWindow--visible' : ''}
      `)}
    >
      <div className="hybridationWindow__tree" ref={treeRef}>
        <div className="hybridationWindow__tree__fg" />
        <HybridationNode
          id="valerian"
          type="neutral"
          state={
            // eslint-disable-next-line no-nested-ternary
            hybridationResearch?.id === 'valerian' ? 'launched' : (
              hybridationIds.includes('valerian') ? 'completed' : 'idle'
            )
          }
          onClick={() => {
            selectTalent('valerian');
            // setLockInfo((prev) => !prev);
          }}
          // onMouseEnter={() => {
          //   selectTalent('valerian');
          // }}
          // onMouseLeave={() => {
          //   selectTalent('valerian');
          // }}
          selected={selectedTalent?.id === 'valerian'}
        />
        {/* TRIBE UPGRADES */}
        <HybridationNode
          id="belladonna"
          type="tribe"
          notUnlocked={vars.tribeTier < Hybridations.belladonna.tier}
          state={
            // eslint-disable-next-line no-nested-ternary
            hybridationResearch?.id === 'belladonna' ? 'launched' : (
              hybridationIds.includes('belladonna') ? 'completed' : 'idle'
            )
          }
          onClick={() => {
            selectTalent('belladonna');
          }}
          selected={selectedTalent?.id === 'belladonna'}
        />
        <HybridationNode
          id="bluebell"
          type="tribe"
          notUnlocked={vars.tribeTier < Hybridations.bluebell.tier}
          state={
            // eslint-disable-next-line no-nested-ternary
            hybridationResearch?.id === 'bluebell' ? 'launched' : (
              hybridationIds.includes('bluebell') ? 'completed' : 'idle'
            )
          }
          onClick={() => {
            selectTalent('bluebell');
          }}
          selected={selectedTalent?.id === 'bluebell'}
        />
        <HybridationNode
          id="chives"
          type="tribe"
          notUnlocked={vars.tribeTier < Hybridations.chives.tier}
          state={
            // eslint-disable-next-line no-nested-ternary
            hybridationResearch?.id === 'chives' ? 'launched' : (
              hybridationIds.includes('chives') ? 'completed' : 'idle'
            )
          }
          onClick={() => {
            selectTalent('chives');
          }}
          selected={selectedTalent?.id === 'chives'}
        />
        <HybridationNode
          id="holly"
          type="tribe"
          notUnlocked={vars.tribeTier < Hybridations.holly.tier}
          state={
            // eslint-disable-next-line no-nested-ternary
            hybridationResearch?.id === 'holly' ? 'launched' : (
              hybridationIds.includes('holly') ? 'completed' : 'idle'
            )
          }
          onClick={() => {
            selectTalent('holly');
          }}
          selected={selectedTalent?.id === 'holly'}
        />
        <HybridationNode
          id="geranium"
          type="tribe"
          notUnlocked={vars.tribeTier < Hybridations.geranium.tier}
          state={
            // eslint-disable-next-line no-nested-ternary
            hybridationResearch?.id === 'geranium' ? 'launched' : (
              hybridationIds.includes('geranium') ? 'completed' : 'idle'
            )
          }
          onClick={() => {
            selectTalent('geranium');
          }}
          selected={selectedTalent?.id === 'geranium'}
        />
        <HybridationNode
          id="candytuft"
          type="tribe"
          notUnlocked={vars.tribeTier < Hybridations.candytuft.tier}
          state={
            // eslint-disable-next-line no-nested-ternary
            hybridationResearch?.id === 'candytuft' ? 'launched' : (
              hybridationIds.includes('candytuft') ? 'completed' : 'idle'
            )
          }
          onClick={() => {
            selectTalent('candytuft');
          }}
          selected={selectedTalent?.id === 'candytuft'}
        />
        <HybridationNode
          id="hyssop"
          type="tribe"
          notUnlocked={vars.tribeTier < Hybridations.hyssop.tier}
          state={
            // eslint-disable-next-line no-nested-ternary
            hybridationResearch?.id === 'hyssop' ? 'launched' : (
              hybridationIds.includes('hyssop') ? 'completed' : 'idle'
            )
          }
          onClick={() => {
            selectTalent('hyssop');
          }}
          selected={selectedTalent?.id === 'hyssop'}
        />
        {/* DRYAD UPGRADES */}
        <HybridationNode
          id="crocus"
          type="dryad"
          notUnlocked={vars.dryadTier < Hybridations.crocus.tier}
          state={
            // eslint-disable-next-line no-nested-ternary
            hybridationResearch?.id === 'crocus' ? 'launched' : (
              hybridationIds.includes('crocus') ? 'completed' : 'idle'
            )
          }
          onClick={() => {
            selectTalent('crocus');
          }}
          selected={selectedTalent?.id === 'crocus'}
        />
        <HybridationNode
          id="sage"
          type="dryad"
          notUnlocked={vars.dryadTier < Hybridations.sage.tier}
          state={
            // eslint-disable-next-line no-nested-ternary
            hybridationResearch?.id === 'sage' ? 'launched' : (
              hybridationIds.includes('sage') ? 'completed' : 'idle'
            )
          }
          onClick={() => {
            selectTalent('sage');
          }}
          selected={selectedTalent?.id === 'sage'}
        />
        <HybridationNode
          id="callaLily"
          type="dryad"
          notUnlocked={vars.dryadTier < Hybridations.callaLily.tier}
          state={
            // eslint-disable-next-line no-nested-ternary
            hybridationResearch?.id === 'callaLily' ? 'launched' : (
              hybridationIds.includes('callaLily') ? 'completed' : 'idle'
            )
          }
          onClick={() => {
            selectTalent('callaLily');
          }}
          selected={selectedTalent?.id === 'callaLily'}
        />
        <HybridationNode
          id="edelweiss"
          type="dryad"
          notUnlocked={vars.dryadTier < Hybridations.edelweiss.tier}
          state={
            // eslint-disable-next-line no-nested-ternary
            hybridationResearch?.id === 'edelweiss' ? 'launched' : (
              hybridationIds.includes('edelweiss') ? 'completed' : 'idle'
            )
          }
          onClick={() => {
            selectTalent('edelweiss');
          }}
          selected={selectedTalent?.id === 'edelweiss'}
        />
        <HybridationNode
          id="borage"
          type="dryad"
          notUnlocked={vars.dryadTier < Hybridations.borage.tier}
          state={
            // eslint-disable-next-line no-nested-ternary
            hybridationResearch?.id === 'borage' ? 'launched' : (
              hybridationIds.includes('borage') ? 'completed' : 'idle'
            )
          }
          onClick={() => {
            selectTalent('borage');
          }}
          selected={selectedTalent?.id === 'borage'}
        />
        <HybridationNode
          id="coriander"
          type="dryad"
          notUnlocked={vars.dryadTier < Hybridations.coriander.tier}
          state={
            // eslint-disable-next-line no-nested-ternary
            hybridationResearch?.id === 'coriander' ? 'launched' : (
              hybridationIds.includes('coriander') ? 'completed' : 'idle'
            )
          }
          onClick={() => {
            selectTalent('coriander');
          }}
          selected={selectedTalent?.id === 'coriander'}
        />
        <HybridationNode
          id="butterflyWeed"
          type="dryad"
          notUnlocked={vars.dryadTier < Hybridations.butterflyWeed.tier}
          state={
            // eslint-disable-next-line no-nested-ternary
            hybridationResearch?.id === 'butterflyWeed' ? 'launched' : (
              hybridationIds.includes('butterflyWeed') ? 'completed' : 'idle'
            )
          }
          onClick={() => {
            selectTalent('butterflyWeed');
          }}
          selected={selectedTalent?.id === 'butterflyWeed'}
        />
      </div>
      <div
        className={classTrim(`
          hybridationWindow__info
          ${openInfo ? ' hybridationWindow__info--visible' : ''}
        `)}
      >
        <div className="hybridationWindow__info__mainBlock">
          <h3 className="hybridationWindow__info__title">{selectedTalent?.name}</h3>
          <p className="hybridationWindow__info__lore">{`"${selectedTalent?.meaning}"`}</p>
          <div className="hybridationWindow__info__gains">
            <p className="hybridationWindow__info__gains__nectar">
              <Icon
                className="hybridationWindow__info__gains__nectar__icon"
                type="nectar"
              />
              {selectedTalent?.nectarUpg
                ? `+${selectedTalent?.nectarUpg}`
                : '-'}
            </p>
            <p className="hybridationWindow__info__gains__flower">
              <Icon
                className="hybridationWindow__info__gains__flower__icon"
                type="flower"
              />
              {selectedTalent?.flowerUpg
                ? `+${selectedTalent?.flowerUpg}`
                : '-'}
            </p>
          </div>
        </div>
        <div
          className={classTrim(`
            hybridationWindow__info__cost
            ${selectedTalent?.flowerCost > vars.flower ? ' hybridationWindow__info__cost--expensive' : ''}
          `)}
        >
          <p className="hybridationWindow__info__cost__flower">
            <Icon
              className="hybridationWindow__info__cost__flower__icon"
              type="flower"
            />
            {`-${selectedTalent?.flowerCost}`}
          </p>
          <p
            className={classTrim(`
              hybridationWindow__info__cost__time
            `)}
          >
            <Icon
              className="hybridationWindow__info__cost__time__icon"
              type="timer"
            />
            {`-${selectedTalent?.duration}`}
          </p>
        </div>
        <Button
          theme="icon"
          className="hybridationWindow__info__button"
          onClick={onHybridationClick}
          disabled={
            !canResearch
            || hybridationIds.includes(selectedTalent.id)
            || !!hybridationResearch
          }
        >
          {
            // eslint-disable-next-line no-nested-ternary
            hybridationResearch?.id === selectedTalent?.id ? 'Researching...' : (
              hybridationIds.includes(selectedTalent?.id) ? 'Researched' : 'Research ?'
            )
          }
        </Button>
      </div>
    </ScrollContainer>
  );
};

export default HybridationWindow;
