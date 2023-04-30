import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Button from '../molecules/button';
import { useEvent } from '../../providers/Event';

import DryadDialog from '../../assets/texts/dryadDialogue';

import './dialogueWindow.scss';
import DynamicTextDisplay from './dynamicTextDisplay';
import { curateAndDomifyText } from '../../utils';

const DialogueWindow = () => {
  const [isOpen, setOpen] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [textBlocks, setTextBlocks] = useState([]);
  const [answers, setAnswers] = useState([]);

  const scrollRef = useRef();

  const { Event } = useEvent();

  const scrollBottom = useCallback(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, []);

  const addDialogue = useCallback((text, goto) => {
    const dialogs = [];
    dialogs.push({
      text,
      speaker: 'player',
      speakerName: 'You',
    });
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
    setAnswers(dialog.answers?.length > 0
      ? dialog.answers.map((answer, index) => ({
        ...answer,
        id: index,
      }))
      : []);
  }, []);

  useEffect(() => {
    if (!Event) { return; }
    Event.addEventListener('openDialogue', ({ detail }) => {
      setOpen(true);
      const dialog = DryadDialog[detail.id];
      setTextBlocks((prev) => {
        if (!prev) {
          return [dialog];
        }
        const next = [...prev];
        next.push(dialog);
        return next;
      });
      setAnswers(dialog.answers.length > 0
        ? dialog.answers.map((answer, index) => ({
          ...answer,
          id: index,
        }))
        : []);
    });
  }, [Event]);
  return (
    <div className={`dialogue ${isOpen ? ' dialogue--open' : ''}`}>
      <h1 className="dialogue__title"> Dialogue </h1>
      <div className="dialogue__content" ref={scrollRef}>
        <DynamicTextDisplay
          textBlocks={textBlocks}
          setButtonDisabled={setButtonDisabled}
          scrollBottom={scrollBottom}
          toSkip
        />
      </div>
      <div className="dialogue__buttons">
        {
        answers.length > 0
          ? answers.map((answer) => (
            <Button
              invisible={buttonDisabled}
              key={answer.id}
              onClick={() => {
                addDialogue(answer.text, answer.goto);
              }}
            >
              {curateAndDomifyText(answer.text)}
            </Button>
          ))
          : (
            <Button
              invisible={buttonDisabled}
              onClick={() => {
                Event.dispatchEvent(new CustomEvent('test', {
                  detail: { text: 'coucou' },
                }));
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
