import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from 'react';
import SiriWave from 'siriwave';
import ReactHowler from 'react-howler';
import { songs, Song } from '../../assets/config/songs';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';
import { arr } from '../../utils/utils';
import * as styles from './index.module.less';
import Controller from './Controller';
import { iRootState } from '../../redux/store';
import { ReactComponent as MusicLoadingSvg } from '../../assets/img/musicLoading.svg';
import useMediaMeta from './useMediaMeta';

/**伪随机数组 */
const getRandomList = () =>
  arr(songs.length)
    .map((item, index) => index + 1)
    .sort(() => Math.random() - 0.5);

/** Controller panel */
const Panel = () => {
  const {
    playerVisible,
    music: { playing, volume, mute, loop, id, loaded },
  } = useSelector((state: iRootState) => state);
  const dispatch = useDispatch();

  const [randomList, setRandomList] = useState<number[]>([]);
  const siriWaveRef = useRef<SiriWave>(null);

  const setLoaded = useCallback(
    (loaded: boolean) => {
      dispatch({ type: 'MUSIC', payload: { loaded } });
    },
    [dispatch]
  );

  const waveRefCallback = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      const wave = new SiriWave({
        container: document.getElementById('wave'),
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
    if (playing && playerVisible && loaded) {
      siriWaveRef.current?.start();
    } else {
      siriWaveRef.current?.stop();
    }
    return () => {
      siriWaveRef.current?.stop();
    };
  }, [playing, loaded, playerVisible]);

  /**
   * change play status
   * @param {Song} song - song detail
   */
  const handleClick = useCallback(
    (song: Song) => {
      if (song.id === id) {
        dispatch({ type: 'MUSIC', payload: { playing: !playing } });
      } else {
        !loop && setRandomList(getRandomList());
        dispatch({
          type: 'MUSIC',
          payload: { id: song.id, playing: true },
        });
      }
    },
    [dispatch, id, playing, loop]
  );

  const renderSongItem = useCallback(
    (song: Song) => (
      <li
        key={song.id}
        onClick={() => handleClick(song)}
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
    ),
    [id, playing, playerVisible, loaded, handleClick]
  );

  /** current song id */
  const songUrl = useMemo(() => {
    return songs.filter((song) => song.id === id)[0]?.url;
  }, [id]);

  /**
   * list random mode: generate random id list
   */
  useEffect(() => {
    if (!loop) {
      setRandomList(getRandomList());
    }
  }, [loop]);

  /**onEnd, loop or random play */
  const handleMusicEnd = useCallback(() => {
    if (!loop) {
      let tmpList = randomList.filter((item) => item !== id);
      if (tmpList.length < 1) {
        tmpList = getRandomList().filter((item) => item !== id);
      }
      setRandomList(tmpList);
      dispatch({ type: 'MUSIC', payload: { id: tmpList[0] } });
    }
  }, [id, loop, randomList, dispatch]);

  /**
   * modify media session action
   */
  useEffect(() => {
    const handler = function (playing: boolean) {
      dispatch({ type: 'MUSIC', payload: { playing } });
    };

    navigator.mediaSession.setActionHandler('play', () => handler(true));
    navigator.mediaSession.setActionHandler('pause', () => handler(false));
    navigator.mediaSession.setActionHandler('pause', () => handler(false));
    navigator.mediaSession.setActionHandler('previoustrack', function () {});
    navigator.mediaSession.setActionHandler('nexttrack', function () {
      handleMusicEnd();
    });
    // eslint-disable-next-line
  }, [dispatch]);

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
        onEnd={handleMusicEnd}
        onLoad={() => setLoaded(true)}
        onLoadError={() => setLoaded(false)}
      />
      <div ref={waveRefCallback}>
        <Controller />
        <ul className={styles.list}>
          {songs.map((song) => renderSongItem(song))}
        </ul>

        {!loaded && <MusicLoadingSvg className={styles.loadingSvg} />}
      </div>
    </>
  );
};

export default React.memo(Panel);
