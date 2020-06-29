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
    case 'SEARCH': {
      return { ...state, search: action.payload.trim() };
    }
    case 'MUSIC': {
      state.music = { ...state.music, ...action.payload };
      return state;
    }
  }
  return state;
};

const initialState = {
  scene: true,
  trigger: false,
  hasArrow: true,
  skip: false,
  search: '',
  music: {
    playing: false,
    volume: 0.7,
    mute: false,
    loop: false,
    id: 2 as number | null,
  },
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
