import React, { useMemo, useContext } from 'react';
import PropTypes from 'prop-types';

const EventContext = React.createContext();

// Send events
// Event.dispatchEvent(new CustomEvent(`${sentEventId}`, {
//   detail: {
//     proceed: true,
//   },
// }));

function Emitter() {
  const eventTarget = document.createDocumentFragment();

  function delegate(method) {
    this[method] = eventTarget[method].bind(eventTarget);
  }

  Emitter.methods.forEach(delegate, this);
}

function EventEmitter() {
  Emitter.call(this);
}

Emitter.methods = ['addEventListener', 'dispatchEvent', 'removeEventListener'];

export const EventProvider = ({ children }) => {
  const Event = useMemo(() => new EventEmitter(), []);

  return (
    <EventContext.Provider value={Event}>
      {children}
    </EventContext.Provider>
  );
};

EventProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useEvent = () => {
  const Event = useContext(EventContext);

  return { Event };
};
