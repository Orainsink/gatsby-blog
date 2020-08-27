import { createStore as reduxCreateStore } from 'redux';
const windowGlobal = typeof window !== 'undefined' && window;

const reducer = (state, action) => {
  switch (action.type) {
    case 'SCENE': {
      windowGlobal?.localStorage.setItem('SCENE', action.payload ? '1' : '');
      return { ...state, scene: action.payload };
    }
    case 'TRIGGER': {
      return { ...state, trigger: action.payload };
    }
    case 'HAS_ARROW': {
      return { ...state, hasArrow: action.payload };
    }
    case 'SKIP': {
      windowGlobal?.localStorage.setItem('SKIP', action.payload ? '1' : '');
      return { ...state, skip: action.payload };
    }
    case 'RESET_SEARCH': {
      return { ...state, curTag: '', curDate: '' };
    }
    case 'CUR_TAG': {
      return { ...state, curTag: action.payload.trim(), curDate: '' };
    }
    case 'CUR_DATE': {
      return { ...state, curTag: '', curDate: action.payload };
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
  scene:
    windowGlobal && windowGlobal?.localStorage.getItem('SCENE') !== null
      ? Boolean(localStorage.getItem('SCENE'))
      : true,
  trigger: false,
  hasArrow: true,
  skip:
    windowGlobal && windowGlobal?.localStorage.getItem('SKIP') !== null
      ? Boolean(localStorage.getItem('SKIP'))
      : false,
  curTag: '',
  curDate: '',
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
