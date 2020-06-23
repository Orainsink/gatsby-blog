import { createStore as reduxCreateStore } from 'redux';

const reducer = (state, action) => {
  switch (action.type) {
    case 'SCENE': {
      return { ...state, scene: action.payload };
    }
    case 'TRIGGER': {
      return { ...state, trigger: action.payload };
    }
    case 'HASARROW': {
      return { ...state, hasArrow: action.payload };
    }
    case 'SKIP': {
      return { ...state, skip: action.payload };
    }
  }
  return state;
};

const initialState = {
  scene: true,
  trigger: false,
  hasArrow: true,
  skip: false,
};

const windowGlobal = typeof window !== 'undefined' && window;

const createStore = () =>
  reduxCreateStore(
    reducer,
    initialState,
    // @ts-ignore
    windowGlobal?.__REDUX_DEVTOOLS_EXTENSION__ &&
      // @ts-ignore
      windowGlobal?.__REDUX_DEVTOOLS_EXTENSION__()
  );
export default createStore;
