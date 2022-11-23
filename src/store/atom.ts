import { windowWrapper } from './../utils/windowWrapper';
import { atom } from 'recoil';

interface MusicState {
  playing: boolean;
  volume: number;
  mute: boolean;
  loop: boolean;
  id: number;
  title: string;
  loaded: boolean;
}

// scene 判断是否隐藏主页scene及按需加载
export const sceneAtom = atom<boolean>({
  key: 'scene',
  default: windowWrapper<boolean>(
    () => Boolean(localStorage.getItem('SCENE')),
    true
  ),
});

// trigger 判断首页是否鼠标滑到了视区下方的热区
export const triggerAtom = atom<boolean>({
  key: 'trigger',
  default: false,
});

// hasArrow 判断header是否有切换scene的箭头
export const hasArrowAtom = atom<boolean>({
  key: 'hasArrow',
  default: true,
});

// skip 用于scene代码的按需加载
export const skipAtom = atom<boolean>({
  key: 'skip',
  default: false,
});

export const filterAtom = atom<Record<'curTag' | 'curDate', string>>({
  key: 'filter',
  default: {
    curTag: '',
    curDate: '',
  },
});

// 是否已滚动，触发header样式改变
export const headerDropAtom = atom<boolean>({
  key: 'headerDrop',
  default: false,
});

// playerVisible 音乐播放器是否显示
export const playerVisibleAtom = atom<boolean>({
  key: 'playerVisible',
  default: false,
});

// music 播放器的状态
export const musicAtom = atom<MusicState>({
  key: 'music',
  default: {
    playing: false,
    volume: 0.3,
    mute: false,
    loop: false,
    id: 2,
    title: '',
    loaded: false,
  },
});

// showSearchResult 判断是否显示 search dropdown
export const showSearchResultAtom = atom<boolean>({
  key: 'showSearchResult',
  default: false,
});
