export interface HowlOptions {
  src: string;
  format?: string[];
  xhr?: { [key: string]: string };
  mute?: boolean;
  preload?: boolean | string;
  loop?: boolean;
  volume?: number;
  rate?: number;
  onend?: () => void;
  onpause?: () => void;
  onplay?: () => void;
  onplayerror?: () => void;
  onvolume?: () => void;
  onstop?: () => void;
  onload?: () => void;
  onseek?: () => void;
  onloaderror?: () => void;
  html5: boolean;
}
export declare class HowlType {
  constructor({
    src,
    xhr,
    format,
    mute,
    loop,
    preload,
    volume,
    rate,
    onend,
    onplay,
    onplayerror,
    onpause,
    onvolume,
    onstop,
    onload,
    onseek,
    onloaderror,
    html5,
  }: HowlOptions);

  pause(id?: number): void;
  stop(id?: number): void;
  playing(id?: number): boolean;
  play(id?: number): void;
  duration(id?: number): void;
  load(): void;
  unload(): void;
  mute(muted: boolean, id?: number): void;
  volume(volume?: number, id?: number): void;
  fade(from: number, to: number, duration: number, id?: number): void;
  rate(rate?: number, id?: number): void;
  seek(seek?: number, id?: number): void;
  loop(loop?: boolean, id?: number): void;
  state(): 'unloaded' | 'loading' | 'loaded';
  on(event: string, func: () => void, id?: number): void;
  once(event: string, func: () => void, id?: number): void;
  off(event?: string, func?: () => void, id?: number): void;
}
export interface HowlerProps {
  src: string;
  playing: boolean;
  format?: string[];
  xhr?: { [key: string]: string };
  mute?: boolean;
  preload?: boolean | 'metadata' | undefined;
  loop?: boolean;
  volume?: number;
  rate?: number;
  onEnd?: () => void;
  onPause?: () => void;
  onPlay?: () => void;
  onPlayError?: () => void;
  onVolume?: () => void;
  onStop?: () => void;
  onLoad?: () => void;
  onSeek?: () => void;
  onLoadError?: () => void;
  html5: boolean;
}
