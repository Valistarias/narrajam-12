import React, { useEffect, useState } from 'react';

import { useEvent } from '../../providers/Event';

import './dialogueWindow.scss';
import Button from '../molecules/button';

const DialogueWindow = () => {
  const [isOpen, setOpen] = useState(false);
  const { Event } = useEvent();

  useEffect(() => {
    if (!Event) { return; }
    Event.addEventListener('openDialogue', ({ detail }) => {
      setOpen(true);
      console.log('opening dialogue', detail.id);
    });
  }, [Event]);

  return (
    <div className={`dialogue ${isOpen ? ' dialogue--open' : ''}`}>
      <h1> Dialogue </h1>
      <Button
        onClick={() => {
          Event.dispatchEvent(new CustomEvent('test', {
            detail: { text: 'coucou' },
          }));
          setOpen(false);
        }}
      >
        Close me
      </Button>
    </div>
  );
};

export default DialogueWindow;
