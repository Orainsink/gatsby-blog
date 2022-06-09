import { useRef, useEffect } from 'react';
import { Howl } from 'howler';

import { HowlType, HowlerProps } from './typings';

/**
 *  destroy Howl instance
 * @param howler Howl instance
 */
const destroyHowler = (howler: HowlType | null): void => {
  if (!howler) return;
  howler.off();
  howler.stop();
  howler.unload();
  howler = null;
};

/**
 * https://github.com/goldfire/howler.js
 */
const ReactHowler = ({
  src,
  volume = 1.0,
  html5 = true,
  loop = false,
  preload = true,
  mute = false,
  playing = true,
  format = ['mp3'],
  xhr = {},
  rate = 1,
  onEnd,
  onPause,
  onPlay,
  onPlayError,
  onVolume,
  onStop,
  onLoad,
  onSeek,
  onLoadError,
}: HowlerProps) => {
  const howlerRef = useRef<HowlType>();

  /**
   * save some init options
   */
  const latestPropsRef = useRef({
    mute,
    loop,
    volume,
  });

  /**
   * init Howler
   */
  useEffect(() => {
    destroyHowler(howlerRef.current!);
    const latestProps = latestPropsRef.current;

    const howler: HowlType = new Howl({
      src,
      xhr,
      format,
      mute: latestProps.mute,
      loop: latestProps.loop,
      preload,
      volume: latestProps.volume,
      rate,
      onplay: onPlay,
      onplayerror: onPlayError,
      onpause: onPause,
      onvolume: onVolume,
      onstop: onStop,
      onload: onLoad,
      onseek: onSeek,
      onloaderror: onLoadError,
      html5,
    });

    if (playing) {
      howler.play();
    }

    howlerRef.current = howler;

    return () => {
      destroyHowler(howlerRef.current!);
    };
    // eslint-disable-next-line
  }, [src]);

  /**
   * toggle loop
   */
  useEffect(() => {
    howlerRef.current!.loop(loop);
    latestPropsRef.current.loop = loop;
  }, [loop]);
  /**
   * toggle mute
   */
  useEffect(() => {
    howlerRef.current!.mute(mute);
    latestPropsRef.current.mute = mute;
  }, [mute]);
  /**
   * toggle volume
   */
  useEffect(() => {
    howlerRef.current!.volume(volume);
    latestPropsRef.current.volume = volume;
  }, [volume]);
  /**
   * toggle volume
   */
  useEffect(() => {
    howlerRef.current!.off('end');
    onEnd && howlerRef.current!.on('end', onEnd);
  }, [onEnd]);
  /**
   * toggle playing state
   */
  useEffect(() => {
    const howler = howlerRef.current!;

    const play = () => {
      if (!howler.playing()) {
        if (howler.state() === 'unloaded') {
          howler.load();
        }

        howler.play();
      }
    };

    playing ? play() : howler.pause();
  }, [playing]);

  return <></>;
};

export default ReactHowler;
