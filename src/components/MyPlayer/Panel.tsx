import { memo, useState, useEffect, useMemo, useCallback, useRef } from 'react';
import SiriWave from 'siriwave';

import { Song, SONGS } from '../../assets/constants/songs';
import classnames from 'classnames';
import { arr } from '../../utils/utils';
import * as styles from './index.module.less';
import { Controller } from './Controller';
import { ReactComponent as MusicLoadingSvg } from '../../assets/img/musicLoading.svg';
import { useMediaMeta } from './useMediaMeta';
import { ReactHowler } from './Howler';
import { useRecoilState, useRecoilValue } from 'recoil';
import { musicAtom, playerVisibleAtom } from '../../store/atom';

interface SongProps {
  onClick: (song: Song) => void;
  id: number;
  playing: boolean;
  playerVisible: boolean;
  loaded: boolean;
}

/**伪随机数组 */
const getRandomList = () =>
  arr(SONGS.length)
    .map((_, index) => index + 1)
    .sort(() => Math.random() - 0.5);

const SongsList = memo(
  ({ onClick, id, playing, playerVisible, loaded }: SongProps) => (
    <ul className={styles.list}>
      {SONGS.map((song) => (
        <li
          key={song.id}
          onClick={() => onClick(song)}
          className={classnames(styles.liWrap, {
            [styles.active]: song.id === id,
          })}
        >
          <span className={styles.name}>{song.name}</span>
          {song.id === id && loaded && (
            <div
              className={classnames(
                styles.playingImg,
                playing && playerVisible ? styles.running : styles.paused
              )}
            >
              <div />
              <div />
              <div />
              <div />
              <div />
            </div>
          )}
        </li>
      ))}
    </ul>
  )
);

/** Controller panel */
export const Panel = memo(() => {
  const [{ playing, volume, mute, loop, id, loaded }, setMusic] =
    useRecoilState(musicAtom);
  const playerVisible = useRecoilValue(playerVisibleAtom);

  const [randomList, setRandomList] = useState<number[]>([]);
  const siriWaveRef = useRef<SiriWave>();

  const setLoaded = useCallback(
    (loaded: boolean) => {
      setMusic((state) => ({ ...state, loaded }));
    },
    [setMusic]
  );

  const waveRefCallback = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      const wave = new SiriWave({
        container: document.getElementById('wave')!,
        cover: true,
        //@ts-ignore
        style: 'ios9',
        amplitude: 2,
      });
      wave.stop();
      siriWaveRef.current = wave;
    }
  }, []);

  useEffect(() => {
    const siriwave = siriWaveRef.current!;
    if (playing && playerVisible && loaded) {
      siriwave.start();
    } else {
      siriwave.stop();
    }
    return () => {
      siriwave.stop();
    };
  }, [playing, loaded, playerVisible]);

  /**
   * change play status
   * @param {Song} song - song detail
   */
  const handleClick = useCallback(
    (song: Song) => {
      if (song.id === id) {
        setMusic((state) => ({ ...state, playing: !playing }));
      } else {
        !loop && setRandomList(getRandomList());
        setMusic((state) => ({ ...state, id: song.id, playing: true }));
      }
    },
    [setMusic, id, playing, loop]
  );

  /** current song id */
  const songUrl = useMemo(() => {
    return SONGS.filter((song) => song.id === id)[0]?.url;
  }, [id]);

  /**
   * list random mode: generate random id list
   */
  useEffect(() => {
    if (!loop) {
      setRandomList(getRandomList());
    }
  }, [loop]);

  const toNextSong = useCallback(() => {
    let tmpList = randomList.filter((item) => item !== id);
    if (tmpList.length < 1) {
      tmpList = getRandomList().filter((item) => item !== id);
    }
    setRandomList(tmpList);
    setMusic((state) => ({ ...state, id: tmpList[0] }));
  }, [setMusic, id, randomList]);

  /**onEnd, loop or random play */
  const handleMusicEnd = useCallback(() => {
    if (!loop) {
      toNextSong();
    }
  }, [loop, toNextSong]);

  /**
   * modify media session action
   */
  useEffect(() => {
    const handler = (playing: boolean) => {
      setMusic((state) => ({ ...state, playing }));
    };

    if (navigator && navigator.mediaSession) {
      navigator.mediaSession.setActionHandler('play', () => handler(true));
      navigator.mediaSession.setActionHandler('pause', () => handler(false));
      navigator.mediaSession.setActionHandler('pause', () => handler(false));
      navigator.mediaSession.setActionHandler('previoustrack', () => {});
      navigator.mediaSession.setActionHandler('nexttrack', () => toNextSong());
    }
    // eslint-disable-next-line
  }, [setMusic]);

  useMediaMeta(id);

  return (
    <>
      <ReactHowler
        html5
        playing={playing}
        volume={volume}
        mute={mute}
        loop={loop}
        src={songUrl}
        format={['mp3']}
        onEnd={() => handleMusicEnd()}
        onLoad={() => setLoaded(true)}
        onLoadError={() => setLoaded(false)}
      />
      <div ref={waveRefCallback}>
        <Controller />
        <SongsList
          onClick={handleClick}
          id={id}
          playing={playing}
          playerVisible={playerVisible}
          loaded={loaded}
        />
        {!loaded && <MusicLoadingSvg className={styles.loadingSvg} />}
      </div>
    </>
  );
});
