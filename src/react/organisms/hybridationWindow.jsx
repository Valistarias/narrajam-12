import React, {
  useCallback,
  useEffect, useState,
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
      && selectedTalent?.duration <= vars.timeBlock
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

  return (
    <ScrollContainer
      // vertical
      // horizontal
      hideScrollbars
      className={classTrim(`
        hybridationWindow
        ${visible ? ' hybridationWindow--visible' : ''}
      `)}
    >
      <div className="hybridationWindow__tree">
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
              ${selectedTalent?.duration > vars.timeBlock ? ' hybridationWindow__info__cost__time--expensive' : ''}
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
          Research ?
        </Button>
      </div>
    </ScrollContainer>
  );
};

export default HybridationWindow;
