import { useCallback, memo, ReactElement } from 'react';
import { Col, Row, Slider } from 'antd';
import { useRecoilState } from 'recoil';

import { ReactComponent as PausedSvg } from '../../assets/img/paused.svg';
import { ReactComponent as StartSvg } from '../../assets/img/start.svg';
import { ReactComponent as RandomSvg } from '../../assets/img/random.svg';
import { ReactComponent as LoopSvg } from '../../assets/img/loop.svg';
import { ReactComponent as VolumeSvg } from '../../assets/img/volume.svg';
import * as styles from './index.module.less';
import { musicAtom } from '../../store/atom';

/**Controller */
export const Controller = memo((): ReactElement => {
  const [{ playing, volume, loop }, setMusic] = useRecoilState(musicAtom);

  /** stop/start playing */
  const handleClick = useCallback(() => {
    setMusic((state) => ({ ...state, ...{ playing: !state.playing } }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * loop mode
   * true: single track loop
   * false: list random
   */
  const handleLoop = useCallback(() => {
    setMusic((state) => ({ ...state, ...{ loop: !state.loop } }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="wave" className={styles.waveWrap}>
      <Row className={styles.controller} gutter={8} align="middle">
        <Col className={styles.start}>
          {playing ? (
            <PausedSvg onClick={handleClick} />
          ) : (
            <StartSvg onClick={handleClick} />
          )}
        </Col>
        <Col className={styles.loop}>
          {loop ? (
            <LoopSvg style={{ width: '24px' }} onClick={handleLoop} />
          ) : (
            <RandomSvg style={{ width: '18px' }} onClick={handleLoop} />
          )}
        </Col>
        <Col className={styles.volume} flex={1}>
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
        </Col>
      </Row>
    </div>
  );
});
