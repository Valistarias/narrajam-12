import React, {
  useState, useMemo, useContext, useCallback,
} from 'react';
import PropTypes from 'prop-types';

const GlobalVarsContext = React.createContext();

export const GlobalVarsProvider = ({ children }) => {
  const [vars, setVars] = useState({});

  const updateVar = useCallback(({ name, value }) => {
    setVars((prev) => {
      const next = { ...prev };
      next[name] = value;
      if (JSON.stringify(prev) === JSON.stringify(next)) {
        return prev;
      }
      return next;
    });
  }, []);

  const providerValues = useMemo(() => ({
    vars,
    updateVar,
  }), [vars, updateVar]);

  return (
    <GlobalVarsContext.Provider value={providerValues}>
      {children}
    </GlobalVarsContext.Provider>
  );
};

GlobalVarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useGlobalVars = () => {
  const {
    vars,
    updateVar,
  } = useContext(GlobalVarsContext);

  return { vars, updateVar };
};
