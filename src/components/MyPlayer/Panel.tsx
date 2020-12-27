import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from 'react';
import SiriWave from 'siriwave';
import ReactHowler from 'react-howler';
import { songs, Song } from '../../assets/js/songs';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';
import { arr } from '../../utils/utils';
import styles from '../../styles/MyPlayer.module.less';
import Controller from './Controller';

/** Controller panel */
const Panel = () => {
  const { playing, volume, mute, loop, id } = useSelector(
    (state) => state.music
  );
  const dispatch = useDispatch();

  const [randomList, setRandomList] = useState([]);
  const siriWaveRef = useRef(null);

  const waveRefCallback = useCallback((node) => {
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
    if (playing) {
      siriWaveRef.current?.start();
    } else {
      siriWaveRef.current?.stop();
    }
    return () => {
      siriWaveRef.current?.stop();
    };
  }, [playing]);

  const generateRandom = useMemo(() => {
    return arr(songs.length)
      .map((item, index) => index + 1)
      .sort(() => Math.random() - 0.5);
  }, []);

  /**
   * change play status
   * @param {Song} song - song detail
   */
  const _handleClick = useCallback(
    (song: Song) => {
      if (song.id === id) {
        dispatch({ type: 'MUSIC', payload: { playing: !playing } });
      } else {
        !loop && setRandomList(generateRandom);
        dispatch({
          type: 'MUSIC',
          payload: { id: song.id, playing: true },
        });
      }
    },
    [dispatch, id, playing, generateRandom, loop]
  );

  const renderSongItem = useCallback(
    (song: Song) => (
      <li
        key={song.id}
        onClick={() => _handleClick(song)}
        className={classnames(
          styles.liWrap,
          song.id === id ? styles.active : null
        )}
      >
        <span className={styles.name}>{song.name}</span>
        {song.id === id ? (
          <div
            className={classnames(
              styles.playingImg,
              playing ? styles.running : styles.paused
            )}
          >
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>
        ) : null}
      </li>
    ),
    [id, playing, _handleClick]
  );

  const songUrl = useMemo(() => {
    return songs.filter((song) => song.id === id)[0]?.url;
  }, [id]);

  /**
   * list random mode: generate random id list
   */
  useEffect(() => {
    if (!loop) {
      setRandomList(generateRandom);
    }
  }, [loop, generateRandom]);

  /**onEnd, loop or random play */
  const _handleMusicEnd = useCallback(() => {
    if (!loop) {
      let tmpList = randomList.filter((item) => item !== id);
      if (tmpList.length < 1) {
        tmpList = generateRandom.filter((item) => item !== id);
      }
      setRandomList(tmpList);
      dispatch({ type: 'MUSIC', payload: { id: tmpList[0] } });
    }
  }, [id, loop, generateRandom, randomList, dispatch]);

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
        onEnd={_handleMusicEnd}
      />
      <div ref={waveRefCallback}>
        <Controller />
        <ul className={styles.list}>
          {songs.map((song) => renderSongItem(song))}
        </ul>
      </div>
    </>
  );
};

export default React.memo(Panel);
