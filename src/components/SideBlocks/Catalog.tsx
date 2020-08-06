import React, { useRef, useMemo } from 'react';
import styles from '../../styles/SideBar.module.less';
import { Col } from 'antd';
import classnames from 'classnames';
import useScrollY from '../../hooks/useScrollY';

interface ICatalog {
  content: any;
}
/** 侧边栏 目录块 */
const Catalog: React.FC<ICatalog> = (props) => {
  const { content } = props;
  const catalogRef = useRef(null);
  const scrollY = useScrollY();

  const isFixd = useMemo(() => {
    if (catalogRef.current) {
      return scrollY > 333;
    }
  }, [scrollY]);

  const isHide = useMemo(() => {
    if (catalogRef) {
      return (
        scrollY > document.body.scrollHeight - document.body.clientHeight - 400
      );
    }
  }, [scrollY]);

  return (
    <Col
      flex="0 0 300px"
      className={classnames(styles.col, styles.catalogWrap, {
        [styles.catalogFix]: isFixd,
        [styles.hide]: isHide,
      })}
    >
      <div className={styles.title}>Catalog</div>
      <div
        ref={catalogRef}
        className={classnames(styles.catalog)}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </Col>
  );
};
export default React.memo(Catalog);
