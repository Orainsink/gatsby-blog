import React, { useCallback, useRef } from 'react';
import { Col, Row } from 'antd';
import { Link } from 'gatsby';
import { useMagicColor } from '../../hooks';
import styles from '../../styles/Header.module.less';
import { categoryColumn } from '../../assets/config/categories';

let column: {
  key: string;
  path: string;
  name: string;
}[][] = [];
for (let i = 0; i < categoryColumn.length; i += 2) {
  column.push(categoryColumn.slice(i, i + 2));
}

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
      {column.map((item, index) => (
        <Row align="middle" justify="space-between" key={index}>
          {item.map((category) => (
            <Col span={12} className={styles.cls} key={category.name}>
              <Link to={category.path}>{category.name}</Link>
            </Col>
          ))}
        </Row>
      ))}
    </div>
  );
});

export default React.memo(ArchivesMenu);
