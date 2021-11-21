import React, { useCallback, useRef } from 'react';
import { Col, Row } from 'antd';
import { Link } from 'gatsby';
import { useMagicColor } from '../../hooks';
import * as styles from './index.module.less';
import {
  CATEGORY_MAP,
  CATEGORY_NAMES,
} from '../../assets/constants/categories';

let column: string[][] = [];
for (let i = 0; i < CATEGORY_NAMES.length; i += 2) {
  column.push(CATEGORY_NAMES.slice(i, i + 2));
}

const ArchivesMenu = React.memo(({ visible }: { visible: boolean }) => {
  const magicRef = useRef<HTMLDivElement>(null);
  useMagicColor(magicRef.current, visible);

  const refCallback = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      magicRef.current = node;
    }
  }, []);

  return (
    <div className={styles.dropMenu} ref={refCallback}>
      {column.map((item, index) => (
        <Row align="middle" justify="space-between" key={index}>
          {item.map((category) => (
            <Col span={12} key={category}>
              <Link to={CATEGORY_MAP.get(category).path}>
                {CATEGORY_MAP.get(category).name}
              </Link>
            </Col>
          ))}
        </Row>
      ))}
    </div>
  );
});

export default React.memo(ArchivesMenu);
