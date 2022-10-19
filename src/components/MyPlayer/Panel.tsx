import { memo, useState, useEffect, useCallback, useRef } from 'react';
import SiriWave from 'siriwave';
import styled, { css, keyframes } from 'styled-components';

import { Song, SONGS } from '../../assets/constants/songs';
import { arr } from '../../utils/utils';
import { Controller } from './Controller';
import { ReactComponent as MusicLoadingSvg } from '../../assets/img/musicLoading.svg';
import { useMediaMeta } from './useMediaMeta';
import { ReactHowler } from './Howler';
import { useRecoilState, useRecoilValue } from 'recoil';
import { headerDropAtom, musicAtom, playerVisibleAtom } from '../../store/atom';
import { useIsDark } from '../../hooks';

const List = styled.ul`
  margin: 0;
  padding: 0.5em 0;
  font-size: 14px;
  z-index: 1;
  position: relative;
`;

const LiWrap = styled.li<{
  active: boolean;
  isDark: boolean;
  headerDrop: boolean;
}>`
  margin: 0;
  padding: 0.3em 1em;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s ease-in;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  ${({ active }) =>
    active &&
    css`
      padding: 1em 1em;
      background-color: rgba(0, 0, 0, 0.1);
    `}

  ${({ active, isDark, headerDrop }) =>
    active &&
    !isDark &&
    headerDrop &&
    `
    padding: 1em 1em;
    background-color: rgba(0, 0, 0, 0.1);`}

  ${({ isDark, headerDrop }) =>
    !isDark &&
    headerDrop &&
    css`
      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }

      ${PlayingIcon} {
        & > div {
          background-color: var(--text-color);
        }
      }
    `}
`;

const Name = styled.span`
  margin-right: 30px;
  color: inherit;
`;

const WaveAme = keyframes`
0% {
  transform: scaleY(1);
}
50% {
  transform: scaleY(0.6);
}
100% {
  transform: scaleY(1);
}
`;

const PlayingIcon = styled.div<{ running: boolean }>`
  position: relative;
  width: 25px;
  height: 22px;
  text-align: center;
  font-size: 10px;
  transition: all 0.2s ease;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: -25px;
  & > div {
    background-color: #fff;
    height: 100%;
    width: 3px;
    display: inline-block;
    transition: all 0.2s ease;
    animation: ${WaveAme} 1s ease infinite forwards;
    transform-origin: 50% 50%;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.33);
  }
  & > div:nth-child(2) {
    animation-delay: 0.25s;
  }
  & > div:nth-child(3) {
    animation-delay: 0.5s;
  }
  & > div:nth-child(4) {
    animation-delay: 0.75s;
  }
  & > div:nth-child(5) {
    animation-delay: 1s;
  }

  * {
    animation-play-state: ${({ running }) =>
      running ? 'running' : 'paused'} !important;
  }
`;

const LoadingIcon = styled(MusicLoadingSvg)`
  position: absolute;
  width: 2em;
  height: 2em;
  top: 0;
  right: 0;
`;

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
  ({ onClick, id, playing, playerVisible, loaded }: SongProps) => {
    const isDark = useIsDark();
    const headerDrop = useRecoilValue(headerDropAtom);

    return (
      <List>
        {SONGS.map((song) => (
          <LiWrap
            key={song.id}
            onClick={() => onClick(song)}
            active={song.id === id}
            isDark={isDark}
            headerDrop={headerDrop}
          >
            <Name>{song.name}</Name>
            {song.id === id && loaded && (
              <PlayingIcon running={playing && playerVisible}>
                <div />
                <div />
                <div />
                <div />
                <div />
              </PlayingIcon>
            )}
          </LiWrap>
        ))}
      </List>
    );
  }
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
  const songUrl = SONGS.find((song) => song.id === id)?.url;

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
        src={songUrl || ''}
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
        {!loaded && <LoadingIcon />}
      </div>
    </>
  );
});
