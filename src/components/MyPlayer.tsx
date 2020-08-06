import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { Tooltip, Row, Col, Slider } from 'antd';
import SiriWave from 'siriwave';
import ReactHowler from 'react-howler';
import styles from '../styles/MyPlayer.module.less';
import { songs, ISong } from '../assets/js/songs';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';
import { ReactComponent as PausedSvg } from '../assets/img/paused.svg';
import { ReactComponent as StartSvg } from '../assets/img/start.svg';
import { ReactComponent as RandomSvg } from '../assets/img/random.svg';
import { ReactComponent as LoopSvg } from '../assets/img/loop.svg';
import { ReactComponent as VolumeSvg } from '../assets/img/volume.svg';
import { arr } from '../utils/utils';

/**播放器控件 */
const Controller: React.FC = () => {
  const dispatch = useDispatch();
  const { playing, volume, loop } = useSelector((state) => state.music);
  /**暂停/播放 */
  const _handleClick = useCallback(() => {
    dispatch({ type: 'MUSIC', payload: { playing: !playing } });
  }, [playing, dispatch]);

  /**循环模式 true单曲循环,false 列表随机 */
  const _handleClickLoop = useCallback(() => {
    dispatch({ type: 'MUSIC', payload: { loop: !loop } });
  }, [loop, dispatch]);
  return (
    <div id="wave" className={styles.waveWrap}>
      <Row className={styles.controller} gutter={8} align="middle">
        <Col className={styles.start}>
          {playing ? (
            <PausedSvg onClick={_handleClick} />
          ) : (
            <StartSvg onClick={_handleClick} />
          )}
        </Col>
        <Col className={styles.loop}>
          {loop ? (
            <LoopSvg style={{ width: '24px' }} onClick={_handleClickLoop} />
          ) : (
            <RandomSvg style={{ width: '18px' }} onClick={_handleClickLoop} />
          )}
        </Col>
        <Col className={styles.volume} flex={1}>
          <VolumeSvg />
          <Slider
            style={{ width: '100%' }}
            onChange={(val) =>
              dispatch({ type: 'MUSIC', payload: { volume: +val / 10 } })
            }
            defaultValue={volume * 10}
            step={1}
            max={10}
            tooltipVisible={false}
          />
        </Col>
      </Row>
    </div>
  );
};

/**播放器面板 */
const Panel: React.FC = () => {
  const { playing, volume, mute, loop, id } = useSelector(
    (state) => state.music
  );
  const dispatch = useDispatch();
  const waveRef = useRef(null);
  const [randomList, setRandomList] = useState([]);

  const siriWave = useMemo(() => {
    if (waveRef.current) {
      const wave = new SiriWave({
        container: document.getElementById('wave'),
        cover: true,
      });
      wave.stop();
      return wave;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waveRef.current]);

  useEffect(() => {
    if (playing) {
      siriWave && siriWave.start();
    } else {
      siriWave && siriWave.stop();
    }
    return () => {
      siriWave && siriWave.stop();
    };
  }, [playing, siriWave]);

  const generateRandom = useMemo(() => {
    return arr(songs.length)
      .map((item) => item + 1)
      .sort(() => Math.random() - 0.5);
  }, []);

  /**点击item切换歌曲或者暂停播放 */
  const _handleClick = useCallback(
    (song: ISong) => {
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

  const songItem = useCallback(
    (song: ISong) => {
      return (
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
      );
    },
    [id, playing, _handleClick]
  );

  const songUrl = useMemo(() => {
    return songs.filter((song) => song.id === id)[0]?.url;
  }, [id]);

  /**列表随机:生成随机id列表 */
  useEffect(() => {
    if (!loop) {
      setRandomList(generateRandom);
    }
  }, [loop, generateRandom]);

  /**onEnd, 循环或随机 */
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
      <div ref={waveRef}>
        <Controller />
        <ul className={styles.list}>{songs.map((song) => songItem(song))}</ul>
      </div>
    </>
  );
};

/**播放器入口 */
const MyPlayer: React.FC = () => {
  const { playing } = useSelector((state) => state.music);

  return (
    <Tooltip
      title={<Panel />}
      trigger="click"
      overlayClassName={styles.wrapper}
      getPopupContainer={() => document.getElementById('header')}
    >
      <div style={{ cursor: 'pointer', transform: 'translateY(0.2em)' }}>
        <svg
          className={classnames(
            styles.svg,
            playing ? styles.running : styles.paused
          )}
          xmlSpace="preserve"
          viewBox="0 0 100 100"
          y="0"
          x="0"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="50px"
          height="50px"
        >
          <g className={styles.g1}>
            <path d="M27.378 92.5c-5.288 0-9.792-2.668-12.048-7.138-3.657-7.246-.386-16.816 7.446-21.787 2.617-1.661 5.486-2.62 8.354-2.8V27c0-3.22 2.071-6.01 5.154-6.941L76.816 7.81a7.24 7.24 0 0 1 2.098-.31 7.3 7.3 0 0 1 4.323 1.43 7.278 7.278 0 0 1 2.928 5.821V62.37c0 .285-.034.563-.097.828.162 6.045-3.306 12.289-8.911 15.847-2.919 1.852-6.15 2.831-9.344 2.831-5.288 0-9.792-2.669-12.048-7.139-3.656-7.246-.386-16.815 7.446-21.786 2.646-1.68 5.551-2.641 8.452-2.805V37.363l-26.029 7.832v28.381c0 .05-.001.098-.003.148.208 6.132-3.258 12.358-8.908 15.944-2.92 1.853-6.151 2.832-9.345 2.832z"></path>
          </g>
          <g className={styles.g2}>
            <path d="M82.626 14.752a3.71 3.71 0 0 0-4.787-3.554L37.308 23.446A3.712 3.712 0 0 0 34.669 27v37.568c-3.081-.717-6.694-.103-9.997 1.994-6.218 3.946-8.987 11.65-6.183 17.205 2.804 5.556 10.119 6.861 16.337 2.914 4.789-3.04 7.528-8.306 7.255-13.104h.013V42.565L75.2 32.603V53.97c-3.103-.753-6.756-.15-10.094 1.968-6.217 3.946-8.986 11.649-6.183 17.204 2.804 5.556 10.119 6.861 16.337 2.914 4.984-3.163 7.748-8.737 7.207-13.687h.159V14.752z"></path>
          </g>
        </svg>
      </div>
    </Tooltip>
  );
};
export default React.memo(MyPlayer);
