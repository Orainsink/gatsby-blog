import * as React from 'react';

const initState = {
  scene: true,
  trigger: false,
  sliding: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SCENE': {
      if (!action.payload && typeof window !== 'undefined') {
        window.sessionStorage.setItem('skipscene', '1');
      }
      return { ...state, scene: action.payload };
    }
    case 'TRIGGER': {
      return { ...state, trigger: action.payload };
    }
    case 'SLIDING': {
      return { ...state, sliding: action.payload };
    }
  }
};

export default ({ children }) => {
  const MainContext = React.createContext(null);
  const [state, dispatch] = React.useReducer(reducer, initState);
  return (
    <MainContext.Provider value={[state, dispatch]}>
      {children}
    </MainContext.Provider>
  );
};

