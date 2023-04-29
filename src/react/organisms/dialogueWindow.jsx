import React, { useEffect, useState } from 'react';

import './dialogueWindow.scss';
import { useEvent } from '../../providers/Event';

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
      <button
        type="button"
        onClick={() => {
          Event.dispatchEvent(new CustomEvent('test', {
            detail: 'coucou',
          }));
          setOpen(false);
        }}
      >
        Close me
      </button>
    </div>
  );
};

export default DialogueWindow;
