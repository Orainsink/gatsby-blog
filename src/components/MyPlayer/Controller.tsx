import { memo, ReactElement } from 'react';
import { Col, Row, Slider } from 'antd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { ReactComponent as PausedSvg } from '../../assets/img/paused.svg';
import { ReactComponent as StartSvg } from '../../assets/img/start.svg';
import { ReactComponent as RandomSvg } from '../../assets/img/random.svg';
import { ReactComponent as LoopSvg } from '../../assets/img/loop.svg';
import { ReactComponent as VolumeSvg } from '../../assets/img/volume.svg';
import { musicAtom } from '../../store/atom';

const WaveContainer = styled.div`
  position: relative;
  canvas {
    height: 100%;
    width: 100%;
    position: absolute;
    bottom: -60%;
  }
`;

const ControllerBar = styled(Row)`
  margin: 0;
  padding: 1em 1em 0 1em;
  position: relative;
  z-index: 1;
  color: inherit;
  svg {
    fill: currentColor;
    transition: all 0.2s linear;
  }
`;

const Start = styled(Col)`
  svg {
    width: 38px;
    height: 38px;
    cursor: pointer;
    color: inherit;
    &:hover {
      fill: currentColor;
    }
  }
`;

const Loop = styled(Col)`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 28px;
    height: 28px;
    cursor: pointer;
    color: inherit;
    &:hover {
      fill: currentColor;
    }
  }
`;

const Volume = styled(Col)`
  display: flex;
  align-items: center;
  > svg {
    margin-left: 0.6em;
    width: 20px;
    height: 20px;
  }
`;

/**Controller */
export const Controller = memo((): ReactElement => {
  const [{ playing, volume, loop }, setMusic] = useRecoilState(musicAtom);

  /** stop/start playing */
  const handleClick = () =>
    setMusic((state) => ({ ...state, ...{ playing: !state.playing } }));

  /**
   * loop mode
   * true: single track loop
   * false: list random
   */
  const handleLoop = () =>
    setMusic((state) => ({ ...state, ...{ loop: !state.loop } }));

  return (
    <WaveContainer id="wave">
      <ControllerBar gutter={8} align="middle">
        <Start>
          {playing ? (
            <PausedSvg onClick={handleClick} />
          ) : (
            <StartSvg onClick={handleClick} />
          )}
        </Start>
        <Loop>
          {loop ? (
            <LoopSvg style={{ width: '24px' }} onClick={handleLoop} />
          ) : (
            <RandomSvg style={{ width: '18px' }} onClick={handleLoop} />
          )}
        </Loop>
        <Volume flex={1}>
          <VolumeSvg />
          <Slider
            style={{ width: '100%' }}
            onChange={(val) =>
              setMusic((state) => ({ ...state, ...{ volume: +val / 10 } }))
            }
            defaultValue={volume * 10}
            step={1}
            max={10}
            tooltipVisible={false}
          />
        </Volume>
      </ControllerBar>
    </WaveContainer>
  );
});
