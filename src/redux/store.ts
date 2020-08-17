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
    case 'CURTAG': {
      return { ...state, curTag: action.payload.trim() };
    }
    case 'MUSIC': {
      state.music = { ...state.music, ...action.payload };
      return state;
    }
    case 'TITLE': {
      return { ...state, title: action.payload };
    }
    case 'MAX_HEIGHT': {
      return { ...state, maxHeight: action.payload };
    }
  }
  return state;
};

const initialState = {
  scene: true,
  trigger: false,
  hasArrow: true,
  skip: false,
  curTag: '',
  maxHeight: 0,
  music: {
    playing: false,
    volume: 0.5,
    mute: false,
    loop: false,
    id: 2 as number | null,
    title: '',
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
