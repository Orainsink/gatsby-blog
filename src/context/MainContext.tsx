import * as React from 'react';

export const MainContext = React.createContext(null);

const initState = {
  scene: true,
  trigger: false,
  sliding: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SCENE': {
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

const MainProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initState);
  return (
    <MainContext.Provider value={[state, dispatch]}>
      {children}
    </MainContext.Provider>
  );
};

export default MainProvider;
