import { createStore as reduxCreateStore } from 'redux';
import produce from 'immer';
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

const reducer = produce(
  (draft: RootState, action: { type: string; payload: any }): RootState => {
    const { type, payload } = action;
    switch (type) {
      case 'SCENE': {
        draft.scene = payload;
        return draft;
      }
      case 'TRIGGER': {
        draft.trigger = payload;
        return draft;
      }
      case 'HAS_ARROW': {
        draft.hasArrow = payload;
        return draft;
      }
      case 'SKIP': {
        windowGlobal?.localStorage.setItem('SKIP', action.payload ? '1' : '');
        draft.skip = payload;
        return draft;
      }
      case 'RESET_SEARCH': {
        draft.curTag = '';
        draft.curDate = '';
        return draft;
      }
      case 'CUR_TAG': {
        draft.curTag = payload.trim();
        draft.curDate = '';
        return draft;
      }
      case 'CUR_DATE': {
        draft.curDate = payload;
        return draft;
      }
      case 'MUSIC': {
        draft.music = { ...draft.music, ...action.payload };
        return draft;
      }
      case 'TITLE': {
        draft.title = payload;
        return draft;
      }
      case 'MAX_HEIGHT': {
        draft.maxHeight = payload;
        return draft;
      }
      case 'HEADER_DROP': {
        draft.headerDrop = payload;
        return draft;
      }
      case 'THEME': {
        draft.theme = payload;
        return draft;
      }
      default:
        return draft;
    }
  }
);

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
