import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Scrollbar } from 'react-scrollbars-custom';
import Button from '../../molecules/button';
import { useEvent } from '../../../providers/Event';

import NarrativeEvents from '../../../assets/data/narrativeEvents';
import VarNames from '../../../assets/data/varNames';

import { curateAndDomifyText } from '../../../utils';

import './miniDialogueWindow.scss';
import { useGlobalVars } from '../../../providers/GlobalVars';

const MiniDialogueWindow = () => {
  const [isOpen, setOpen] = useState(false);

  const [text, setText] = useState(null);
  const [title, setTitle] = useState('');
  const [answers, setAnswers] = useState([]);

  const [, setvars] = useState({});

  const [hintVisible, setHintVisible] = useState(false);
  const [hintContent, setHintContent] = useState(null);

  const scrollRef = useRef();

  const { Event } = useEvent();
  const {
    updateVar,
  } = useGlobalVars();

  const activateEvents = useCallback((events) => {
    if (events && events.length > 0) {
      events.forEach((evt) => {
        const slicedEvt = evt.split(':');
        if (slicedEvt[0] === 'var') {
          updateVar({
            name: slicedEvt[1],
            value: slicedEvt[2],
            addition: true,
          });
        }
      });
    }
    setOpen(false);
    updateVar({
      name: 'DISPLAY_MINI_DIALOG',
      value: false,
    });
  }, [updateVar]);

  const activateHint = useCallback((actions) => {
    const toDisplay = [];
    if (!actions || actions.length === 0) {
      toDisplay.push(
        <p className="hint__entry" key="remember">This character will remember this...</p>,
      );
    } else {
      actions.forEach((action) => {
        const slicedAction = action.split(':');
        let key;
        let textHint;
        let classes = 'hint__entry';
        if (slicedAction[0] === 'var') {
          [, key] = slicedAction;
          textHint = `${VarNames[slicedAction[1]]}: ${slicedAction[2]}`;
          classes += Number(slicedAction[2]) > 0 ? ' hint__entry--positive' : ' hint__entry--negative';
        } else {
          key = `${slicedAction[0]}:${slicedAction[1]}`;
          textHint = 'Something will happen';
        }
        toDisplay.push(
          <p className={classes} key={key}>{textHint}</p>,
        );
      });
    }
    setHintContent(toDisplay);
    setHintVisible(true);
  }, []);

  const deactivateHint = useCallback(() => {
    setHintVisible(false);
    setHintContent(null);
  }, []);

  useEffect(() => {
    if (!Event) { return; }
    Event.addEventListener('openMiniDialogue', ({ detail }) => {
      setText([]);
      setAnswers([]);
      setTimeout(() => {
        setOpen(true);
        updateVar({
          name: 'DISPLAY_MINI_DIALOG',
          value: true,
        });
        const dialog = NarrativeEvents[detail.name];
        setText(curateAndDomifyText(dialog));
        setTitle(dialog.title);
        setAnswers(dialog.answers.length > 0
          ? dialog.answers.map((answer, index) => ({
            ...answer,
            name: index,
          }))
          : []);
      }, 0);
    });
    Event.addEventListener('sendGlobalvars', ({ detail }) => {
      setvars(detail);
    });
    Event.dispatchEvent(new CustomEvent('sendGlobalvars'));
  }, [Event, updateVar]);

  return (
    <div className={`mini-dialogue ${isOpen ? ' mini-dialogue--open' : ''}`}>
      <h2 className="mini-dialogue__title">{title}</h2>
      <div className={`hint ${hintVisible ? ' hint--open' : ''}`}>
        {hintContent}
      </div>
      <Scrollbar
        className="mini-dialogue__content"
        noDefaultStyles
        style={{
          width: '100%',
          height: '100%',
        }}
        ref={scrollRef}
      >
        <div className="mini-dialogue__content__text">
          {text}
        </div>
      </Scrollbar>
      <div className="mini-dialogue__buttons">
        {
        answers.length > 0
          ? answers.map((answer) => (
            <Button
              key={answer.name}
              onClick={() => {
                activateEvents(answer.actions);
              }}
              onMouseEnter={() => {
                activateHint(answer.actions);
              }}
              onMouseLeave={() => {
                deactivateHint();
              }}
            >
              {curateAndDomifyText(answer)}
            </Button>
          ))
          : (
            <Button
              onClick={() => {
                setOpen(false);
              }}
            >
              Close
            </Button>
          )
        }
      </div>
    </div>
  );
};

export default MiniDialogueWindow;
