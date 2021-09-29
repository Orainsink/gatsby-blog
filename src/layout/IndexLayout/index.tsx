import React, { useEffect, useMemo } from 'react';
import classnames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row } from 'antd';
import SideBar, { TagsBlock, Info } from '../../components/SideBlocks';
import * as styles from './index.module.less';
import { useBackgroundColor } from '../../hooks';
import Comment from '../../components/Comment';
import { iRootState } from '../../redux/store';
import Footer from '../../components/Footer';
import Tools from '../../components/SideBlocks/Tools';
import { useSpring, a } from 'react-spring';

interface Props {
  children?: React.ReactNode;
}

const SCENE_STATUS = {
  ACTIVE: 'ACTIVE',
  DIS_ACTIVE: 'DISACTIVE',
  TRIGGER: 'TRIGGER',
};

const getTop = (status: string) => {
  const topObj = {
    [SCENE_STATUS.ACTIVE]: '100vh',
    [SCENE_STATUS.DIS_ACTIVE]: '0',
    [SCENE_STATUS.TRIGGER]: '90vh',
  };
  return topObj[status];
};

/**index Layout */
const Layout = ({ children }: Props) => {
  const { scene, trigger, skip } = useSelector((state: iRootState) => state);
  const dispatch = useDispatch();

  const status = useMemo(() => {
    if (!scene || skip) {
      return SCENE_STATUS.DIS_ACTIVE;
    }
    if (scene && !skip && trigger) {
      return SCENE_STATUS.TRIGGER;
    }
    if (scene && !skip && !trigger) {
      return SCENE_STATUS.ACTIVE;
    }
  }, [scene, skip, trigger]);

  useBackgroundColor(skip);

  useEffect(() => {
    dispatch({ type: 'HAS_ARROW', payload: true });
    dispatch({ type: 'CUR_TAG', payload: '' });
  }, [dispatch]);

  const spring = useSpring({
    top: getTop(status),
    config: { tension: 560, friction: 13 },
  });

  return (
    <a.div
      className={classnames(styles.wrapper)}
      style={spring}
      id="markdownBody"
    >
      {status !== SCENE_STATUS.DIS_ACTIVE && (
        <div className={classnames(styles.clickTip, trigger && styles.show)}>
          Click to slide
        </div>
      )}
      <main className={styles.main}>
        <Row justify="space-between" gutter={8}>
          <Col flex="1 1 800px" className={styles.mainWrap}>
            {children}
            <Comment />
          </Col>
          <SideBar>
            <Info />
            <TagsBlock />
            <Tools />
          </SideBar>
        </Row>
      </main>
      <Footer />
    </a.div>
  );
};

export default React.memo(Layout);
