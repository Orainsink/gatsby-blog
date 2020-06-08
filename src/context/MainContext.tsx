import * as React from 'react';

const MainContext = React.createContext(null);

const initState = {
  scene: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'scene': {
      return { ...state, scene: action.payload };
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
