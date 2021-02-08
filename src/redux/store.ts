import { createStore as reduxCreateStore } from 'redux';
const windowGlobal: any = typeof window !== 'undefined' && window;

export interface RootState {
  scene: boolean;
  trigger: boolean;
  hasArrow: boolean;
  skip: boolean;
  curTag: string;
  curDate: string;
  maxHeight: number;
  headerDrop: boolean;
  theme: null | boolean;
  title: string;
  music: {
    playing: boolean;
    volume: number;
    mute: boolean;
    loop: boolean;
    id: number | null;
    title: string;
  };
}

const reducer = (
  state: RootState,
  action: { type: string; payload: any }
): RootState => {
  switch (action.type) {
    case 'SCENE': {
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
    case 'HEADER_DROP': {
      return { ...state, headerDrop: action.payload };
    }
    case 'THEME': {
      return { ...state, theme: action.payload };
    }
  }
  return state;
};

const initialState = {
  scene:
    windowGlobal && localStorage.getItem('SCENE') !== null
      ? Boolean(localStorage.getItem('SCENE'))
      : true,
  trigger: false,
  hasArrow: true,
  skip:
    windowGlobal && localStorage.getItem('SKIP') !== null
      ? Boolean(localStorage.getItem('SKIP'))
      : false,
  curTag: '',
  curDate: '',
  maxHeight: 0,
  headerDrop: false,
  theme: null,
  music: {
    playing: false,
    volume: 0.5,
    mute: false,
    loop: false,
    id: 2,
    title: '',
  },
} as RootState;

const createStore = () =>
  reduxCreateStore(
    reducer,
    initialState,
    windowGlobal?.__REDUX_DEVTOOLS_EXTENSION__ &&
      windowGlobal?.__REDUX_DEVTOOLS_EXTENSION__()
  );
export default createStore;
