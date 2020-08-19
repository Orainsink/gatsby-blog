import React, { useRef, useMemo } from 'react';
import styles from '../../styles/SideBar.module.less';
import { Col } from 'antd';
import classnames from 'classnames';
import useScrollY from '../../useHooks/useScrollY';

interface IContents {
  content: any;
}
/** 侧边栏 目录块 */
const Contents: React.FC<IContents> = (props) => {
  const { content } = props;
  const contentsRef = useRef(null);
  const scrollY = useScrollY();

  const isFixed = useMemo(() => {
    if (contentsRef.current) {
      return scrollY > 333;
    }
  }, [scrollY]);

  const isHide = useMemo(() => {
    if (contentsRef) {
      return (
        scrollY > document.body.scrollHeight - document.body.clientHeight - 400
      );
    }
  }, [scrollY]);

  return (
    <Col
      flex="0 0 300px"
      className={classnames(styles.col, styles.contentsWrap, {
        [styles.contentsFix]: isFixed,
        [styles.hide]: isHide,
      })}
    >
      <div className={styles.title}>Contents</div>
      <div
        ref={contentsRef}
        className={classnames(styles.contents)}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </Col>
  );
};
export default React.memo(Contents);
