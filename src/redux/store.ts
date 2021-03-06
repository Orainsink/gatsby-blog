import { createStore as reduxCreateStore } from 'redux';
import produce from 'immer';
export interface RootState {
  scene: boolean;
  trigger: boolean;
  hasArrow: boolean;
  skip: boolean;
  curTag: string;
  curDate: string;
  maxHeight: number;
  headerDrop: boolean;
  theme: null | 'dark' | 'light';
  title: string;
  playerVisible: boolean;
  music: {
    playing: boolean;
    volume: number;
    mute: boolean;
    loop: boolean;
    id: number | null;
    title: string;
    loaded: boolean;
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
        globalThis.localStorage?.setItem('SKIP', payload ? '1' : '');
        draft.skip = payload;
        return draft;
      }
      case 'RESET_SEARCH': {
        draft.curTag = '';
        draft.curDate = '';
        return draft;
      }
      case 'CUR_TAG': {
        draft.curTag = payload?.trim();
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
      case 'PLAYER_VISIBLE': {
        draft.playerVisible = payload;
        return draft;
      }
      default:
        return draft;
    }
  }
);

const initialState = {
  scene:
    globalThis.localStorage?.getItem('SCENE') !== null
      ? Boolean(globalThis.localStorage?.getItem('SCENE'))
      : true,
  trigger: false,
  hasArrow: true,
  skip:
    globalThis.localStorage?.getItem('SKIP') !== null
      ? Boolean(globalThis.localStorage?.getItem('SKIP'))
      : false,
  curTag: '',
  curDate: '',
  maxHeight: 0,
  headerDrop: false,
  theme: globalThis.localStorage?.getItem('theme'),
  playerVisible: false,
  music: {
    playing: false,
    volume: 0.5,
    mute: false,
    loop: false,
    id: 2,
    title: '',
    loaded: false,
  },
} as RootState;

const createStore = () =>
  reduxCreateStore(
    reducer,
    initialState,
    // @ts-ignore
    globalThis?.__REDUX_DEVTOOLS_EXTENSION__?.()
  );
export default createStore;
export type iRootState = RootState;
