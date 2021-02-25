import React, { useCallback } from 'react';
import { Col, Row, Slider } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { ReactComponent as PausedSvg } from '../../assets/img/paused.svg';
import { ReactComponent as StartSvg } from '../../assets/img/start.svg';
import { ReactComponent as RandomSvg } from '../../assets/img/random.svg';
import { ReactComponent as LoopSvg } from '../../assets/img/loop.svg';
import { ReactComponent as VolumeSvg } from '../../assets/img/volume.svg';
import styles from '../../styles/MyPlayer.module.less';
import { iRootState } from '../../redux/store';

/**Controller */
const Controller = () => {
  const dispatch = useDispatch();
  const { playing, volume, loop } = useSelector(
    (state: iRootState) => state.music
  );
  /** stop/start playing */
  const handleClick = useCallback(() => {
    dispatch({ type: 'MUSIC', payload: { playing: !playing } });
  }, [playing, dispatch]);

  /**
   * loop mode
   * true: single track loop
   * false: list random
   */
  const handleLoop = useCallback(() => {
    dispatch({ type: 'MUSIC', payload: { loop: !loop } });
  }, [loop, dispatch]);

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

export default React.memo(Controller);
