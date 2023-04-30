import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Scrollbar } from 'react-scrollbars-custom';
import Button from '../molecules/button';
import { useEvent } from '../../providers/Event';

import NarrativeEvents from '../../assets/texts/narrativeEvents';
import VarNames from '../../assets/texts/varNames';

import { curateAndDomifyText } from '../../utils';

import './miniDialogueWindow.scss';

const MiniDialogueWindow = () => {
  const [isOpen, setOpen] = useState(false);

  const [text, setText] = useState(null);
  const [title, setTitle] = useState('');
  const [answers, setAnswers] = useState([]);

  const [hintVisible, setHintVisible] = useState(false);
  const [hintContent, setHintContent] = useState(null);

  const scrollRef = useRef();

  const { Event } = useEvent();

  const activateEvents = useCallback((events) => {
    if (events && events.length > 0) {
      events.forEach((evt) => {
        const slicedEvt = evt.split(':');
        Event.dispatchEvent(new CustomEvent(slicedEvt[0], {
          detail: {
            id: slicedEvt[1],
            ...(slicedEvt[2] ? { value: slicedEvt[2] } : null),
          },
        }));
      });
    }
    setOpen(false);
  }, [Event]);

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
        const dialog = NarrativeEvents[detail.id];
        setText(curateAndDomifyText(dialog.text));
        setTitle(dialog.title);
        setAnswers(dialog.answers.length > 0
          ? dialog.answers.map((answer, index) => ({
            ...answer,
            id: index,
          }))
          : []);
      }, 0);
    });
  }, [Event]);
  return (
    <div className={`mini-dialogue ${isOpen ? ' mini-dialogue--open' : ''}`}>
      <h1 className="mini-dialogue__title">{title}</h1>
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
              key={answer.id}
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
              {curateAndDomifyText(answer.text)}
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
