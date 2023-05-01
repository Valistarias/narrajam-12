import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Scrollbar } from 'react-scrollbars-custom';
import Button from '../molecules/button';
import { useEvent } from '../../providers/Event';

import DryadDialog from '../../assets/data/dryadDialogue';

import './dialogueWindow.scss';
import DynamicTextDisplay from './dynamicTextDisplay';
import { curateAndDomifyText } from '../../utils';

const DialogueWindow = () => {
  const [isOpen, setOpen] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [textBlocks, setTextBlocks] = useState([]);
  const [title, setTitle] = useState('');
  const [answers, setAnswers] = useState([]);

  const scrollRef = useRef();

  const { Event } = useEvent();

  const scrollBottom = useCallback(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, []);

  const activateEvents = useCallback((events) => {
    if (events && events.length > 0) {
      events.forEach((evt) => {
        const slicedEvt = evt.split(':');
        Event.dispatchEvent(new CustomEvent(slicedEvt[0], {
          detail: {
            name: slicedEvt[1],
            ...(slicedEvt[2] ? { value: slicedEvt[2] } : null),
          },
        }));
      });
    }
  }, [Event]);

  const addDialogue = useCallback((text, goto, continueButton) => {
    if (goto) {
      const dialogs = [];
      if (!continueButton) {
        dialogs.push({
          text,
          speaker: 'player',
          speakerName: 'You',
        });
      }
      const dialog = DryadDialog[goto];
      dialogs.push(dialog);
      setTextBlocks((prev) => {
        if (!prev) {
          return [dialogs];
        }
        const next = [
          ...prev,
          ...dialogs,
        ];
        return next;
      });
      if (dialog.title) {
        setTitle(dialog.title);
      }
      setAnswers(dialog.answers?.length > 0
        ? dialog.answers.map((answer, index) => ({
          ...answer,
          name: index,
        }))
        : []);
    } else {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    if (!Event) { return; }
    Event.addEventListener('openDialogue', ({ detail }) => {
      setTextBlocks([]);
      setAnswers([]);
      setTitle('');
      setTimeout(() => {
        setOpen(true);
        const dialog = DryadDialog[detail.name];
        setTextBlocks((prev) => {
          if (!prev) {
            return [dialog];
          }
          const next = [...prev];
          next.push(dialog);
          return next;
        });
        if (dialog.title) {
          setTitle(dialog.title);
        }
        setAnswers(dialog.answers.length > 0
          ? dialog.answers.map((answer, index) => ({
            ...answer,
            name: index,
          }))
          : []);
      }, 0);
    });
  }, [Event]);
  return (
    <div className={`dialogue ${isOpen ? ' dialogue--open' : ''}`}>
      <h2 className="dialogue__title">{title}</h2>
      <Scrollbar
        className="dialogue__content"
        noDefaultStyles
        style={{
          width: '100%',
          height: '100%',
        }}
        ref={scrollRef}
      >
        <DynamicTextDisplay
          textBlocks={textBlocks}
          setButtonDisabled={setButtonDisabled}
          scrollBottom={scrollBottom}
          // toSkip
        />
      </Scrollbar>
      <div className="dialogue__buttons">
        {
        answers.length > 0
          ? answers.map((answer) => (
            <Button
              invisible={buttonDisabled}
              key={answer.name}
              onClick={() => {
                addDialogue(answer.text, answer.goto, answer.continueButton);
                activateEvents(answer.actions);
              }}
            >
              {curateAndDomifyText({ text: answer.text })}
            </Button>
          ))
          : (
            <Button
              invisible={buttonDisabled}
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

export default DialogueWindow;
