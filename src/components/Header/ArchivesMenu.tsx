import React, { useCallback, useRef } from 'react';
import { Col, Row } from 'antd';
import { Link } from 'gatsby';
import { useMagicColor } from '../../hooks';
import styles from '../../styles/Header.module.less';

const ArchivesMenu = React.memo(({ visible }: { visible: boolean }) => {
  const magicRef = useRef(null);
  useMagicColor(magicRef.current, visible);

  const refCallback = useCallback((node) => {
    if (node !== null) {
      magicRef.current = node;
    }
  }, []);

  return (
    <div className={styles.dropMenu} ref={refCallback}>
      <Row align="middle" justify="space-between">
        <Col span={12} className={styles.cls}>
          <Link to="/archives">技术</Link>
        </Col>
        <Col span={12} className={styles.cls}>
          <Link to="/leetcode">Leetcode</Link>
        </Col>
      </Row>
      <Row align="middle" justify="space-between">
        <Col span={12} className={styles.cls}>
          <Link to="/snippet">Snippet</Link>
        </Col>
        <Col span={12} className={styles.cls}>
          <Link to="/essay">随笔</Link>
        </Col>
      </Row>
    </div>
  );
});

export default React.memo(ArchivesMenu);
